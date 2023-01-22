import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserRepository } from 'src/common/repository/user/user.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';

@Injectable()
export class WorkspaceService extends PrismaClient {
  constructor(private prisma: PrismaService) {
    super();
  }

  async create(userId: number, createWorkspaceDto: CreateWorkspaceDto) {
    const tenantId = await UserRepository.getTenantId(userId);

    const workspace = await UserRepository.createWorkspace({
      user_id: userId,
      organization_id: tenantId,
      workspace_name: createWorkspaceDto.name,
    });

    return workspace;
  }

  async findAll(userId: number) {
    const tenantId = await UserRepository.getTenantId(userId);

    const workspaces = await this.prisma.workspace.findMany({
      where: {
        tenant_id: tenantId,
      },
    });
    return workspaces;
  }

  async findOne(id: number, userId: number) {
    const tenantId = await UserRepository.getTenantId(userId);

    const workspace = await this.prisma.workspace.findMany({
      where: {
        AND: [
          {
            id: id,
          },
          {
            tenant_id: tenantId,
          },
        ],
      },
    });
    return workspace;
  }

  update(id: number, updateWorkspaceDto: UpdateWorkspaceDto) {
    return `This action updates a #${id} workspace`;
  }

  remove(id: number) {
    return `This action removes a #${id} workspace`;
  }
}