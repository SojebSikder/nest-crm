import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { WhatsappApi } from 'src/common/lib/whatsapp/Whatsapp';
import { UserRepository } from 'src/common/repository/user/user.repository';
import { WorkspaceChannelRepository } from 'src/common/repository/workspace-channel/workspace-channel.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessageService extends PrismaClient {
  constructor(private prisma: PrismaService) {
    super();
  }

  async create(user_id, workspace_id, createMessageDto: CreateMessageDto) {
    workspace_id = Number(workspace_id);

    // get tenant id
    const tenant_id = await UserRepository.getTenantId({ userId: user_id });

    // get workspace channel details
    const channelDetails = await WorkspaceChannelRepository.getDetails({
      id: createMessageDto.workspace_channel_id,
      user_id: user_id,
      workspace_id: workspace_id,
    });

    // check conversation is exist
    const conversation = await this.prisma.conversation.findFirst({
      include: {
        contact: {
          select: {
            phone_number: true,
          },
        },
      },
      where: {
        AND: [
          {
            id: createMessageDto.conversation_id,
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

    if (conversation) {
      // send whatsapp message
      WhatsappApi.config({
        token: channelDetails.access_token,
        phoneNumberId: channelDetails.phone_number_id,
      });

      const whatsappMessage = await WhatsappApi.sendText({
        to: conversation.contact.phone_number,
        message: createMessageDto.body_text,
      });

      // message id
      const message_id = whatsappMessage.messages[0].id;
      // save message to db
      const message = this.prisma.message.create({
        data: {
          type: 'text',
          message_id: message_id,
          body_text: createMessageDto.body_text,
          contact_id: conversation.contact_id,
          workspace_channel_id: createMessageDto.workspace_channel_id,
          conversation_id: createMessageDto.conversation_id,
        },
      });
      if (message) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  findAll() {
    return `This action returns all message`;
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
