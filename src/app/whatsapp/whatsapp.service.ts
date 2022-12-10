import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { WhatsappApi } from 'src/common/lib/whatsapp/Whatsapp';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWhatsappDto } from './dto/create-whatsapp.dto';
import { UpdateWhatsappDto } from './dto/update-whatsapp.dto';

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

  async processWhatsapp({ phone_number_id, token, contactName, from }) {
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
      console.log('channel exist');

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
      } else {
        // create new contact
        await this.prisma.contact.create({
          data: {
            fname: contactName,
            phone_number: from,
          },
        });
      }
      return true;
    } else {
      return false;
    }
  }
}
