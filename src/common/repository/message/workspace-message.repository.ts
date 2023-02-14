import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class MessageRepository {
  /**
   * store message
   * @param param0
   * @returns
   */
  static async storeMessage({
    message_data,
    message_id,
    body_text,
    contact_id,
    workspace_id,
    tenant_id,
    workspace_channel_id,
    conversationCreatedOrOpen = null,
    type = 'text',
  }) {
    return await prisma.$transaction(async () => {
      // save message
      // check if conversation exist
      const isConversationExist = await prisma.conversation.findFirst({
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
        if (isConversationExist.is_open == true) {
          // save message
          // if message type is text
          const saveMessage = await this.saveMessage({
            message_data: message_data,
            type: type,
            message_id: message_id,
            body_text: body_text,
            contact_id: contact_id,
            workspace_channel_id: isConversationExist.workspace_channel_id,
            conversation_id: isConversationExist.id,
          });
          return saveMessage;
        } else {
          // update conversation
          const updateConversation = await prisma.conversation.update({
            where: {
              id: isConversationExist.id,
            },
            data: {
              is_open: true,
            },
          });
          // callbak after conversation created
          if (conversationCreatedOrOpen) {
            conversationCreatedOrOpen(updateConversation);
          }
          // save message
          // if message type is text
          const saveMessage = await this.saveMessage({
            message_data: message_data,
            type: 'text',
            message_id: message_id,
            body_text: body_text,
            contact_id: contact_id,
            workspace_channel_id: isConversationExist.workspace_channel_id,
            conversation_id: isConversationExist.id,
          });
          return saveMessage;
        }
      } else {
        // create conversation
        const createConversation = await prisma.conversation.create({
          data: {
            contact_id: contact_id,
            workspace_channel_id: workspace_channel_id,
            workspace_id: workspace_id,
            tenant_id: tenant_id,
          },
        });
        // callbak after conversation created
        if (conversationCreatedOrOpen) {
          conversationCreatedOrOpen(createConversation);
        }
        // save message
        const saveMessage = await this.saveMessage({
          message_data: message_data,
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

  /**
   * Save messages to database
   * @param param0
   * @returns
   */
  static async saveMessage({
    message_data,
    message_id,
    body_text,
    contact_id,
    workspace_channel_id,
    conversation_id,
    type = 'text',
  }: {
    message_data: any;
    message_id: string;
    body_text: string;
    contact_id: number;
    workspace_channel_id: number;
    conversation_id: number;
    type: string;
  }) {
    // if message type is text
    const saveMessage = await prisma.message.create({
      data: {
        message_data: message_data,
        type: type,
        message_id: message_id,
        body_text: body_text,
        contact_id: contact_id,
        workspace_channel_id: workspace_channel_id,
        conversation_id: conversation_id,
      },
    });
    if (saveMessage) {
      return true;
    } else {
      return false;
    }
  }
}
