import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { WhatsappApi } from 'src/common/lib/whatsapp/Whatsapp';
import { UserRepository } from 'src/common/repository/user/user.repository';
import { PrismaService } from 'src/prisma/prisma.service';
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

    // get phone number id
    WhatsappApi.config({
      token: createWorkspaceChannelDto.access_token,
      accountId: createWorkspaceChannelDto.account_id,
    });
    const getPhoneNumberId = await WhatsappApi.getPhoneNumberIds();
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
        // profile
        avatar: profileDetails.profile_picture_url,
        address: profileDetails.address,
        description: profileDetails.description,
        email: profileDetails.email,
        vertical: profileDetails.vertical,
        website_1: profileDetails.websites[0],
        website_2: profileDetails.websites[1],
        //
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

    return workspaceChannel;
  }

  findAll() {
    return `This action returns all workspaceChannel`;
  }

  findOne(id: number) {
    return `This action returns a #${id} workspaceChannel`;
  }

  update(id: number, updateWorkspaceChannelDto: UpdateWorkspaceChannelDto) {
    return `This action updates a #${id} workspaceChannel`;
  }

  remove(id: number) {
    return `This action removes a #${id} workspaceChannel`;
  }
}
