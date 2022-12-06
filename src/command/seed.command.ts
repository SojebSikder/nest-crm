// external imports
import { Command, CommandRunner } from 'nest-commander';
import { StringHelper } from '../common/helper/string.helper';
// internal imports
import { UserRepository } from '../common/repository/user/user.repository';
import { PrismaService } from '../prisma/prisma.service';

@Command({ name: 'seed', description: 'prisma db seed' })
export class SeedCommand extends CommandRunner {
  constructor(private readonly prisma: PrismaService) {
    super();
  }
  async run(passedParam: string[]): Promise<void> {
    await this.seed(passedParam);
  }

  async seed(param: string[]) {
    try {
      console.log(`Prisma Env: ${process.env.PRISMA_ENV}`);
      console.log('Seeding started...');

      await this.roleSeed();
      await this.permissionSeed();
      await this.userSeed();
      await this.roleUserSeed();
      await this.permissionRoleSeed();

      console.log('Seeding done.');
    } catch (error) {
      throw error;
    }
  }

  async userSeed() {
    await UserRepository.createSuAdminUser({
      username: 'admin',
      email: 'admin@example.com',
      password: '123',
    });

    // await UserRepository.createTenantAdminUser({
    //   username: 'sojebsikder',
    //   email: 'sojebsikder@gmail.com',
    //   password: '123',
    //   domain: 'sojebschool',
    // });

    const organization = await this.prisma.organization.create({
      data: {
        name: 'sojebsoft',
        phone_nummber: '+8801822851484',
        website: 'sojebsoft.com',
      },
    });

    await UserRepository.createUser({
      username: 'sojeb',
      email: 'sojeb@gmail.com',
      password: '123',
      tenant_id: organization.id,
    });
    await UserRepository.createUser({
      username: 'sikder',
      email: 'sikder@gmail.com',
      password: '123',
      tenant_id: organization.id,
    });
  }

  async permissionRoleSeed() {
    const all_permissions = await this.prisma.permission.findMany();
    const admin_permissions = all_permissions.filter(function (permission) {
      return permission.title.substring(0, 18) == 'tenant_management_';
    });

    const adminPermissionRoleArray = [];
    for (const admin_permission of admin_permissions) {
      adminPermissionRoleArray.push({
        role_id: 1,
        permission_id: admin_permission.id,
      });
    }
    await this.prisma.permissionRole.createMany({
      data: adminPermissionRoleArray,
    });
    //
    const tenant_admin_permissions = all_permissions.filter(function (
      permission,
    ) {
      return permission.title.substring(0, 18) != 'tenant_management_';
    });

    const tenantAdminPermissionRoleArray = [];
    for (const admin_permission of tenant_admin_permissions) {
      tenantAdminPermissionRoleArray.push({
        role_id: 2,
        permission_id: admin_permission.id,
      });
    }
    await this.prisma.permissionRole.createMany({
      data: tenantAdminPermissionRoleArray,
    });
    //
    const tenant_user_permissions = all_permissions.filter(function (
      permission,
    ) {
      return (
        permission.title.substring(0, 17) == 'asset_management_' ||
        permission.title.substring(0, 17) == 'image_management_' ||
        permission.title.substring(0, 20) == 'document_management_' ||
        permission.title.substring(0, 16) == 'note_management_'
      );
    });

    const tenantUserPermissionRoleArray = [];
    for (const user_permission of tenant_user_permissions) {
      tenantUserPermissionRoleArray.push({
        role_id: 3,
        permission_id: user_permission.id,
      });
    }
    await this.prisma.permissionRole.createMany({
      data: tenantUserPermissionRoleArray,
    });
    //
  }

  async roleUserSeed() {
    await this.prisma.roleUser.create({
      data: {
        user_id: 1,
        role_id: 1,
      },
    });
    await this.prisma.roleUser.create({
      data: {
        user_id: 2,
        role_id: 2,
      },
    });
    await this.prisma.roleUser.create({
      data: {
        user_id: 3,
        role_id: 3,
      },
    });
  }

  async permissionSeed() {
    let i = 0;
    const permissions = [];
    const permissionGroups = [
      { title: 'tenant_management', subject: 'Tenant' },
      { title: 'user_management', subject: 'User' },
      { title: 'role_management', subject: 'Role' },
      { title: 'note_management', subject: 'Note' },
    ];

    for (const permissionGroup of permissionGroups) {
      for (const permission of ['read', 'create', 'update', 'show', 'delete']) {
        permissions.push({
          id: ++i,
          title: permissionGroup.title + '_' + permission,
          action: StringHelper.cfirst(permission),
          subject: permissionGroup.subject,
        });
      }
    }

    await this.prisma.permission.createMany({
      data: permissions,
    });
  }

  async roleSeed() {
    await this.prisma.role.createMany({
      data: [
        {
          id: 1,
          title: 'Admin',
        },
        {
          id: 2,
          title: 'Tenant Admin',
        },
        {
          id: 3,
          title: 'Tenant User',
        },
      ],
    });
  }
}
