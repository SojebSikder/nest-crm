import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { DateHelper } from 'src/common/helper/date.helper';
import { Sojebvar } from 'src/common/lib/Sojebvar/Sojebvar';
import { WhatsappApi } from '../../../common/lib/whatsapp/Whatsapp';
import { UserRepository } from '../../../common/repository/user/user.repository';
import { WorkspaceChannelRepository } from '../../../common/repository/workspace-channel/workspace-channel.repository';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessageService extends PrismaClient {
  constructor(private prisma: PrismaService) {
    super();
  }

  async create(
    { user_id, workspace_id, conversation_id },
    createMessageDto: CreateMessageDto,
  ) {
    conversation_id = Number(conversation_id);
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
            fname: true,
            lname: true,
            phone_number: true,
            email: true,
            country: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      where: {
        AND: [
          {
            id: conversation_id,
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
      // parse the message
      // system variables
      Sojebvar.addVariable({
        'system.current_datetime': DateHelper.now().toISOString(),
        'system.current_date': DateHelper.now().toDateString(),
        'system.current_time': DateHelper.now().toTimeString(),
      });
      // contact variables

      Sojebvar.addVariable({
        'contact.name': `${conversation.contact.fname} ${conversation.contact.lname}`,
        'contact.fname': `${conversation.contact.fname}`,
        'contact.lname': `${conversation.contact.lname}`,
        'contact.email': `${conversation.contact.email}`,
        'contact.country':
          conversation.contact.country != null
            ? conversation.contact.country.name
            : '',
        'contact.phone_number': `${conversation.contact.phone_number}`,
      });

      createMessageDto.body_text = Sojebvar.parse(createMessageDto.body_text);
      // end parsing

      // setup whatsapp credentials
      WhatsappApi.config({
        token: channelDetails.access_token,
        phoneNumberId: channelDetails.phone_number_id,
      });

      // send whatsapp message
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
          message_from_workspace: true,
          message_id: message_id,
          body_text: createMessageDto.body_text,
          contact_id: conversation.contact_id,
          workspace_channel_id: createMessageDto.workspace_channel_id,
          conversation_id: conversation_id,
        },
      });
      if (message) {
        return message;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  async findAll({ user_id, conversation_id, workspace_id }) {
    conversation_id = Number(conversation_id);
    workspace_id = Number(workspace_id);
    // get tenant id
    const tenant_id = await UserRepository.getTenantId({ userId: user_id });
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
            id: conversation_id,
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

    if (!conversation) {
      return false;
    }

    const messages = await this.prisma.message.findMany({
      where: {
        AND: [
          {
            contact_id: conversation.contact_id,
          },
          {
            conversation_id: conversation_id,
          },
        ],
      },
    });

    if (messages) {
      return messages;
    } else {
      return false;
    }
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
