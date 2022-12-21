import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { WhatsappApi } from '../../../common/lib/whatsapp/Whatsapp';
import { UserRepository } from '../../../common/repository/user/user.repository';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateWorkspaceChannelDto } from './dto/create-workspace-channel.dto';
import { UpdateWorkspaceChannelDto } from './dto/update-workspace-channel.dto';

@Injectable()
export class WorkspaceChannelService extends PrismaClient {
  constructor(private prisma: PrismaService) {
    super();
  }

  async create(
    user_id: number,
    workspace_id: number,
    createWorkspaceChannelDto: CreateWorkspaceChannelDto,
  ) {
    workspace_id = Number(workspace_id);
    const tenant_id = await UserRepository.getTenantId({ userId: user_id });

    const phone_number = createWorkspaceChannelDto.phone_number.replace(
      '+',
      '',
    );

    // check existing phone from workspace channel
    const isExistWorkspaceChannel =
      await this.prisma.workspaceChannel.findFirst({
        where: {
          whatsapp_phone_number: phone_number,
        },
      });

    if (isExistWorkspaceChannel) {
      return {
        error: true,
        message: 'Phone number already added on this platfrom',
      };
    }

    // get phone number id
    WhatsappApi.config({
      token: createWorkspaceChannelDto.access_token,
      accountId: createWorkspaceChannelDto.account_id,
    });

    let whatsapp_phone_number = null;
    const getPhoneNumberId = await WhatsappApi.getPhoneNumberIds();
    getPhoneNumberId.map((phoneInfo) => {
      if (phoneInfo.display_phone_number == phone_number) {
        whatsapp_phone_number = phoneInfo.display_phone_number;
      }
    });
    const phoneNumberInfos = getPhoneNumberId.filter((phoneInfo) => {
      return phoneInfo.display_phone_number == phone_number;
    });
    const phoneNumberInfo = phoneNumberInfos[0];

    if (!whatsapp_phone_number) {
      return {
        error: true,
        message: 'Phone number not matched with your whatsapp business account',
      };
    }

    const phone_number_id = getPhoneNumberId[0].id;
    // set phone number, need for fetching profile info
    WhatsappApi.setPhoneNumberId(phone_number_id);
    // get business profile details
    const profileDetails = await WhatsappApi.getBusinessProfileDeatils();
    //
    // webhook information
    // const webhook_key = String(new Date().valueOf());
    const webhook_key = String(Date.now() + Math.random());
    const verify_token = 'sojeb_webhook_token';
    // create record
    const workspaceChannel = await this.prisma.workspaceChannel.create({
      data: {
        channel_name: 'WhatsApp Cloud API',
        // profile
        avatar: profileDetails.profile_picture_url,
        address: profileDetails.address,
        description: profileDetails.description,
        email: profileDetails.email,
        vertical: profileDetails.vertical,
        // website_1: profileDetails.websites[0],
        // website_2: profileDetails.websites[1],
        //
        quality_rating: phoneNumberInfo.quality_rating,
        whatsapp_phone_number: whatsapp_phone_number,
        access_token: createWorkspaceChannelDto.access_token,
        account_id: createWorkspaceChannelDto.account_id,
        phone_number_id: phone_number_id,
        webhook_key: webhook_key,
        verify_token: verify_token,
        //
        workspace_id: workspace_id,
        tenant_id: tenant_id,
      },
    });

    return { success: true, data: workspaceChannel };
  }

  async findAll(user_id: number, workspace_id: number) {
    workspace_id = Number(workspace_id);
    const tenant_id = await UserRepository.getTenantId({ userId: user_id });

    const workspaceChannels = await this.prisma.workspaceChannel.findMany({
      where: {
        AND: [
          {
            workspace_id: workspace_id,
          },
          {
            tenant_id: tenant_id,
          },
        ],
      },
    });
    return workspaceChannels;
  }

  findOne(id: number) {
    return `This action returns a #${id} workspaceChannel`;
  }

  async update(
    user_id: number,
    workspace_id: number,
    id: number,
    updateWorkspaceChannelDto: UpdateWorkspaceChannelDto,
  ) {
    workspace_id = Number(workspace_id);
    const tenant_id = await UserRepository.getTenantId({ userId: user_id });

    const workspaceChannel = await this.prisma.workspaceChannel.updateMany({
      where: {
        AND: [
          {
            id: id,
          },
          {
            workspace_id: workspace_id,
          },
          {
            tenant_id: tenant_id,
          },
        ],
      },
      data: {
        avatar: updateWorkspaceChannelDto.avatar,
        address: updateWorkspaceChannelDto.address,
        description: updateWorkspaceChannelDto.description,
        email: updateWorkspaceChannelDto.email,
        vertical: updateWorkspaceChannelDto.vertical,
        website_1: updateWorkspaceChannelDto.website_1,
        website_2: updateWorkspaceChannelDto.website_2,
      },
    });
    // update whatsapp profile
    WhatsappApi.config({
      token: workspaceChannel[0].access_token,
      accountId: workspaceChannel[0].account_id,
      phoneNumberId: workspaceChannel[0].phone_number_id,
    });
    await WhatsappApi.updateBusinessProfileDeatils({
      address: workspaceChannel[0].address,
      description: workspaceChannel[0].description,
      email: workspaceChannel[0].email,
      vertical: workspaceChannel[0].vertical,
      websites: [workspaceChannel[0].website_1, workspaceChannel[0].website_2],
    });
    return workspaceChannel;
  }

  async remove(user_id: number, workspace_id: number, id: number) {
    workspace_id = Number(workspace_id);
    const tenant_id = await UserRepository.getTenantId({ userId: user_id });
    const workspaceChannel = await this.prisma.workspaceChannel.deleteMany({
      where: {
        AND: [
          {
            id: id,
          },
          {
            workspace_id: workspace_id,
          },
          {
            tenant_id: tenant_id,
          },
        ],
      },
    });
    return workspaceChannel;
  }
}
