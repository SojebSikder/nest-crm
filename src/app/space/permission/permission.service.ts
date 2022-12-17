import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class PermissionService extends PrismaClient {
  constructor(private prisma: PrismaService) {
    super();
  }

  async findAll() {
    const role_id = 2; // admin role
    const permissions = await this.prisma.role.findFirst({
      where: {
        id: role_id,
      },
      include: {
        permission_roles: {
          select: {
            permission: {
              select: {
                id: true,
                title: true,
              },
            },
          },
        },
      },
    });
    return permissions;
  }
}
