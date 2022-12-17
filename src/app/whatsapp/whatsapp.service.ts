import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { SocketGateway } from 'src/socket/socket.gateway';
import { WhatsappApi } from '../../common/lib/whatsapp/Whatsapp';
import { MessageRepository } from '../../common/repository/message/workspace-message.repository';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class WhatsappService extends PrismaClient {
  constructor(
    private readonly prisma: PrismaService,
    private readonly socketGateway: SocketGateway,
  ) {
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

  async findConversation({ phone_number_id, from }) {
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
              phone_number: from,
            },
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
        const conversation = await this.prisma.conversation.findFirst({
          where: {
            AND: [
              {
                contact_id: contact.id,
              },
              {
                workspace_id: contact.workspace_id,
              },
              {
                tenant_id: contact.tenant_id,
              },
            ],
          },
        });
        return conversation;
      } else {
        return false;
      }
    }
  }
  async findMessage({ phone_number_id, from, conversation_id }) {
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
              phone_number: from,
            },
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
        const message = await this.prisma.message.findFirst({
          where: {
            AND: [
              {
                contact_id: contact.id,
              },
              {
                conversation_id: conversation_id,
              },
            ],
          },
        });
        return message;
      } else {
        return false;
      }
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
              phone_number: from,
            },
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
        return await MessageRepository.storeMessage({
          message_id: message_id,
          body_text: body_text,
          contact_id: contact.id,
          workspace_id: contact.workspace_id,
          tenant_id: contact.tenant_id,
          workspace_channel_id: whatsappChannel.id,
          conversationCreatedOrOpen: (conversationData) => {
            const data = {
              conversation: {
                id: conversationData.id,
                contact: contact,
              },
              workspace: {
                id: contact.workspace_id,
              },
            };
            this.socketGateway.server.emit('conversation', data);
          },
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
              return await MessageRepository.storeMessage({
                message_id: message_id,
                body_text: body_text,
                contact_id: createContact.id,
                workspace_id: createContact.workspace_id,
                tenant_id: createContact.tenant_id,
                workspace_channel_id: whatsappChannel.id,
                conversationCreatedOrOpen: (conversationData) => {
                  const data = {
                    conversation: {
                      id: conversationData.id,
                      contact: contact,
                    },
                    workspace: {
                      id: contact.workspace_id,
                    },
                  };
                  this.socketGateway.server.emit('conversation', data);
                },
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
}
