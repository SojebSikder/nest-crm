import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserRepository } from '../../../common/repository/user/user.repository';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateWorkspaceUserDto } from './dto/create-workspace-user.dto';
import { UpdateWorkspaceUserDto } from './dto/update-workspace-user.dto';

@Injectable()
export class WorkspaceUserService extends PrismaClient {
  constructor(private prisma: PrismaService) {
    super();
  }
  create(createWorkspaceUserDto: CreateWorkspaceUserDto) {
    return 'This action adds a new workspaceUser';
  }

  async findAll(user_id, workspace_id) {
    workspace_id = Number(workspace_id);
    const tenant_id = await UserRepository.getTenantId({ userId: user_id });
    const workspaceUsers = this.prisma.workspaceUser.findMany({
      include: {
        user: {
          select: {
            id: true,
            fname: true,
            lname: true,
            email: true,
            tenant_id: true,
          },
        },
      },
      where: {
        AND: [
          {
            workspace_id: workspace_id,
          },
          {
            tenant_id: tenant_id,
          },
        ],
      },
    });
    return workspaceUsers;
  }

  findOne(id: number) {
    return `This action returns a #${id} workspaceUser`;
  }

  update(id: number, updateWorkspaceUserDto: UpdateWorkspaceUserDto) {
    return `This action updates a #${id} workspaceUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} workspaceUser`;
  }
}
