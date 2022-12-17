import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class MessageRepository {
  /**
   * store message
   * @param param0
   * @returns
   */
  static async storeMessage({
    message_id,
    body_text,
    contact_id,
    workspace_id,
    tenant_id,
    workspace_channel_id,
    conversationCreated = null,
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
        // save message
        // if message type is text
        const saveMessage = await this.saveMessage({
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
        const createConversation = await prisma.conversation.create({
          data: {
            contact_id: contact_id,
            workspace_channel_id: workspace_channel_id,
            workspace_id: workspace_id,
            tenant_id: tenant_id,
          },
        });
        // callbak after conversation created
        if (conversationCreated) {
          conversationCreated(createConversation);
        }
        // save message
        const saveMessage = await this.saveMessage({
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
    message_id,
    body_text,
    contact_id,
    workspace_channel_id,
    conversation_id,
    type = 'text',
  }) {
    // if message type is text
    const saveMessage = await prisma.message.create({
      data: {
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
