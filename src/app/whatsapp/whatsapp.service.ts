import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { WhatsappApi } from 'src/common/lib/whatsapp/Whatsapp';
import { MessageRepository } from 'src/common/repository/message/workspace-channel.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WhatsappService extends PrismaClient {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  findAll() {
    return `This action returns all whatsapp`;
  }

  async findOne(webhook_key: string) {
    const workspaceChannel = await this.prisma.workspaceChannel.findFirst({
      where: {
        webhook_key: webhook_key,
      },
    });
    if (workspaceChannel) {
      return workspaceChannel;
    } else {
      return false;
    }
  }

  async verify_whatsapp(webhook_key: string) {
    const workspaceChannel = await this.prisma.workspaceChannel.updateMany({
      where: {
        webhook_key: webhook_key,
      },
      data: {
        verified: true,
      },
    });
    if (workspaceChannel) {
      return true;
    } else {
      return false;
    }
  }

  async processWhatsapp({
    phone_number_id,
    token,
    contactName,
    from,
    message_id,
    body_text,
  }) {
    // set whatsapp credentials
    WhatsappApi.config({
      phoneNumberId: phone_number_id,
      token: token,
    });
    // send message back to user
    // await WhatsappApi.sendText({
    //   to: from,
    //   message: 'Ack: ' + msg_body,
    // });
    // find whatsapp channel via phone number id
    // if channel type is whatsapp
    const whatsappChannel = await this.prisma.workspaceChannel.findFirst({
      where: {
        phone_number_id: phone_number_id,
      },
    });
    if (whatsappChannel) {
      // check the contact existence
      const contact = await this.prisma.contact.findFirst({
        where: {
          AND: [
            {
              workspace_id: whatsappChannel.workspace_id,
            },
            {
              tenant_id: whatsappChannel.tenant_id,
            },
          ],
        },
      });
      if (contact) {
        // save message
        return this.storeMessage({
          message_id: message_id,
          body_text: body_text,
          contact_id: contact.id,
          workspace_id: contact.workspace_id,
          tenant_id: contact.tenant_id,
          workspace_channel_id: whatsappChannel.id,
        });
      } else {
        // create contact
        await this.prisma.$transaction(async () => {
          // create new contact
          const createContact = await this.prisma.contact.create({
            data: {
              fname: contactName,
              phone_number: from,
              workspace_id: whatsappChannel.workspace_id,
              tenant_id: whatsappChannel.tenant_id,
            },
          });
          if (createContact) {
            // create contact workspace channel relationship
            const createContactWorkspaceChannel =
              await this.prisma.contactWorkspaceChannel.create({
                data: {
                  contact_id: createContact.id,
                  workspace_channel_id: whatsappChannel.id,
                  workspace_id: whatsappChannel.workspace_id,
                  tenant_id: whatsappChannel.tenant_id,
                },
              });
            if (createContactWorkspaceChannel) {
              // save message
              return this.storeMessage({
                message_id: message_id,
                body_text: body_text,
                contact_id: createContact.id,
                workspace_id: createContact.workspace_id,
                tenant_id: createContact.tenant_id,
                workspace_channel_id: whatsappChannel.id,
              });
            } else {
              return false;
            }
          }
        });
      }
      return true;
    } else {
      return false;
    }
  }

  async storeMessage({
    message_id,
    body_text,
    contact_id,
    workspace_id,
    tenant_id,
    workspace_channel_id,
  }) {
    return await this.prisma.$transaction(async () => {
      // save message
      // check if conversation exist
      const isConversationExist = await this.prisma.conversation.findFirst({
        where: {
          AND: [
            {
              contact_id: contact_id,
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
      if (isConversationExist) {
        // save message
        // if message type is text
        const saveMessage = await MessageRepository.saveMessage({
          type: 'text',
          message_id: message_id,
          body_text: body_text,
          contact_id: contact_id,
          workspace_channel_id: isConversationExist.workspace_channel_id,
          conversation_id: isConversationExist.id,
        });
        return saveMessage;
      } else {
        // create conversation
        const createConversation = await this.prisma.conversation.create({
          data: {
            contact_id: contact_id,
            workspace_channel_id: workspace_channel_id,
            workspace_id: workspace_id,
            tenant_id: tenant_id,
          },
        });
        // save message
        const saveMessage = await MessageRepository.saveMessage({
          type: 'text',
          message_id: '',
          body_text: '',
          contact_id: contact_id,
          workspace_channel_id: createConversation.workspace_channel_id,
          conversation_id: createConversation.id,
        });
        return saveMessage;
      }
    });
  }
}
