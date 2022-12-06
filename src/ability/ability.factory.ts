import {
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
} from '@casl/ability';
import { PrismaAbility, Subjects } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import { User, Note } from '@prisma/client';
import { Permissions } from './permissions.enum';

export enum Action {
  Manage = 'manage', // wildcard for any action
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Show = 'show',
  Delete = 'delete',
}

// export type Subjects = InferSubjects<User | Note> | 'all';
// export type AppAbility = Ability<[Action, Subjects]>;

export type AppSubjects = Subjects<{
  Tenant: User;
  User: User;
  Note: Note;
}>;

type AppAbility = PrismaAbility<[string, AppSubjects]>;
const AppAbility = PrismaAbility as AbilityClass<AppAbility>;

@Injectable()
export class AbilityFactory {
  defineAbility(user) {
    const { can, cannot, build } = new AbilityBuilder(AppAbility);

    for (const permissionRoles of user.RoleUser[0].Role.PermissionRoles) {
      const action = permissionRoles.Permission.action;
      const subject = permissionRoles.Permission.subject;

      can(Action[action], subject);
      // if (
      //   Permissions.user_management_read == permissionRoles.permission.title
      // ) {
      //   can(Action.Read, 'User');
      // }
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<AppAbility>,
    });
  }
}
