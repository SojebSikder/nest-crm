import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserRepository } from '../../../common/repository/user/user.repository';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';

@Injectable()
export class ConversationService extends PrismaClient {
  constructor(private prisma: PrismaService) {
    super();
  }
  create(createConversationDto: CreateConversationDto) {
    return 'This action adds a new conversation';
  }

  async findAll(user_id, workspace_id) {
    workspace_id = Number(workspace_id);
    const tenant_id = await UserRepository.getTenantId(user_id);
    // get all open conversations
    const conversations = await this.prisma.conversation.findMany({
      include: {
        contact: {
          select: {
            id: true,
            fname: true,
            lname: true,
            email: true,
            assignee_id: true,
          },
        },
      },
      where: {
        AND: [
          {
            is_open: true,
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
    return conversations;
  }

  async findOne(user_id, workspace_id, id: number) {
    workspace_id = Number(workspace_id);
    const tenant_id = await UserRepository.getTenantId(user_id);
    // get all open conversations
    const conversation = await this.prisma.conversation.findMany({
      include: {
        contact: {
          select: {
            id: true,
            fname: true,
            lname: true,
            email: true,
            assignee_id: true,
          },
        },
      },
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
    return conversation;
  }

  async update(
    id: number,
    {
      user_id,
      workspace_id,
      updateConversationDto,
    }: {
      user_id: number;
      workspace_id: number;
      updateConversationDto: UpdateConversationDto;
    },
  ) {
    const is_open = updateConversationDto.is_open;

    workspace_id = Number(workspace_id);
    const tenant_id = await UserRepository.getTenantId(user_id);

    const conversation = await this.prisma.conversation.updateMany({
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
        is_open: is_open,
      },
    });
    return conversation;
  }

  remove(id: number) {
    return `This action removes a #${id} conversation`;
  }
}
