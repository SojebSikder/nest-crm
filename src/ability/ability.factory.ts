import { AbilityBuilder, ExtractSubjectType, PureAbility } from '@casl/ability';
import { createPrismaAbility, Subjects, PrismaQuery } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import {
  WorkspaceChannel,
  Contact,
  User,
  Conversation,
  Organization,
  Role,
  Workspace,
} from '@prisma/client';

export enum Action {
  Manage = 'manage', // wildcard for any action
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Show = 'show',
  Delete = 'delete',
}

export type AppSubjects = Subjects<{
  Tenant: User;
  User: User;
  Role: Role;
  Workspace: Workspace;
  WorkspaceUser: User;
  WorkspaceConversation: Conversation;
  WorkspaceContact: Contact;
  WorkspaceChannel: WorkspaceChannel;
  WorkspaceDataBackup: Contact;
  OrganizationBilling: Organization;
}>;

type AppAbility = PureAbility<[string, AppSubjects], PrismaQuery>;

@Injectable()
export class AbilityFactory {
  defineAbility(user) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(
      createPrismaAbility,
    );

    if (user) {
      for (const permissionRoles of user.role_users[0].role.permission_roles) {
        const action = permissionRoles.permission.action;
        const subject = permissionRoles.permission.subject;

        can(Action[action], subject);
      }
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<AppAbility>,
    });
  }
}
