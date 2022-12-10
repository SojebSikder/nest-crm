import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class MessageRepository {
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
