import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
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

    const workspaceChannel = await this.prisma.workspaceChannel.create({
      data: {
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
