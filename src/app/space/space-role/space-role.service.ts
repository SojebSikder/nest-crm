import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserRepository } from 'src/common/repository/user/user.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSpaceRoleDto } from './dto/create-space-role.dto';
import { UpdateSpaceRoleDto } from './dto/update-space-role.dto';

@Injectable()
export class SpaceRoleService extends PrismaClient {
  constructor(private prisma: PrismaService) {
    super();
  }

  async create(
    user_id: number,
    workspace_id: number,
    createSpaceRoleDto: CreateSpaceRoleDto,
  ) {
    workspace_id = Number(workspace_id);
    const tenant_id = await UserRepository.getTenantId({ userId: user_id });
    const title = createSpaceRoleDto.title;
    const permissions = createSpaceRoleDto.permission_ids;

    return await this.prisma.$transaction(async () => {
      // create role
      const role = await this.prisma.role.create({
        data: {
          title: title,
          workspace_id: workspace_id,
          tenant_id: tenant_id,
        },
      });

      // map role and permissions
      const rolePermissions = permissions.map((per) => {
        return {
          role_id: role.id,
          permission_id: Number(per),
        };
      });

      if (role) {
        // create role permission relationship
        await this.prisma.permissionRole.createMany({
          data: rolePermissions,
        });
      }
      return role;
    });
  }

  async findAll(user_id: number, workspace_id: number) {
    workspace_id = Number(workspace_id);
    const tenant_id = await UserRepository.getTenantId({ userId: user_id });

    const roles = await this.prisma.role.findMany({
      where: {
        workspace_id: workspace_id,
        tenant_id: tenant_id,
      },
    });
    return roles;
  }

  findOne(id: number) {
    return `This action returns a #${id} spaceRole`;
  }

  update(id: number, updateSpaceRoleDto: UpdateSpaceRoleDto) {
    return `This action updates a #${id} spaceRole`;
  }

  remove(id: number) {
    return `This action removes a #${id} spaceRole`;
  }
}
