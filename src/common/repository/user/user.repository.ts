import * as bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import appConfig from '../../../config/app.config';
import { DateHelper } from '../../../common/helper/date.helper';

const prisma = new PrismaClient();

export class UserRepository {
  /**
   * get user details
   * @returns
   */
  static async getUserDetails({ userId }) {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        tenant: true,
        workspace_users: {
          include: {
            workspace: true,
          },
        },
        role_users: {
          include: {
            role: {
              include: {
                permission_roles: {
                  include: {
                    permission: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return user;
  }

  static async getUserByBillingID(billingID) {
    const user = await prisma.user.findFirst({
      where: {
        billing_id: billingID,
      },
      include: {
        tenant: true,
        subscriptions: {
          include: {
            plan: true,
          },
        },
      },
    });
    return user;
  }

  /**
   * get user tenant id
   * @returns
   */
  static async getTenantId(userId: number) {
    const userDetails = await this.getUserDetails({ userId: userId });
    const tenant_id = userDetails.tenant_id ?? userDetails.id;

    return tenant_id;
  }

  /**
   * check tenant ownership
   * @returns
   */
  static async checkTenant({ model, userId }) {
    const userDetails = await this.getUserDetails({ userId: userId });
    const tenant_id = userDetails.tenant_id ?? userDetails.id;

    const check = await model.findFirst({
      where: {
        tenant_id: tenant_id,
      },
    });
    if (check) {
      return userDetails;
    } else {
      return false;
    }
  }

  /**
   * Check existance
   * @returns
   */
  static async exist({ field, value }) {
    const model = await prisma.user.findFirst({
      where: {
        [field]: value,
      },
    });
    return model;
  }

  /**
   * Create su admin user
   * @param param0
   * @returns
   */
  static async createSuAdminUser({ username, email, password }) {
    try {
      password = await bcrypt.hash(password, appConfig().security.salt);

      const user = await prisma.user.create({
        data: {
          username: username,
          email: email,
          password: password,
        },
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Invite user under tenant
   * @param param0
   * @returns
   */
  static async inviteUser({ username, email, tenant_id, role_id }) {
    try {
      const user = await prisma.user.create({
        data: {
          username: username,
          email: email,
          tenant_id: tenant_id,
        },
      });
      if (user) {
        // attach role
        const role = await this.attachRole({
          user_id: user.id,
          role_id: role_id,
        });
        return user;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * Attach a role to a user
   * @param param0
   * @returns
   */
  static async attachRole({ user_id, role_id }) {
    const role = await prisma.roleUser.create({
      data: {
        user_id: user_id,
        role_id: role_id,
      },
    });
    return role;
  }

  /**
   * Create tenant admin user (main subscriber)
   * @param param0
   * @returns
   */
  static async createTenantAdminUser({
    fname,
    lname,
    username,
    email,
    password,
    role_id,
  }) {
    try {
      // begin transaction
      return await prisma.$transaction(async (tx) => {
        // create a organization with 14 days trial period
        const end_date = DateHelper.add(14, 'days').toISOString();
        const organization = await prisma.organization.create({
          data: {
            name: 'organization_xyz',
            trial_end_at: end_date,
          },
        });

        if (organization) {
          // create user
          password = await bcrypt.hash(password, appConfig().security.salt);

          const user = await prisma.user.create({
            data: {
              fname: fname,
              lname: lname,
              username: username,
              email: email,
              password: password,
              tenant_id: organization.id,
            },
          });
          if (user) {
            // create a workspace
            const workspace = await prisma.workspace.create({
              data: {
                name: 'My New Workspace',
                tenant_id: organization.id,
              },
            });
            // add this user to the workspace as an admin
            await prisma.workspaceUser.create({
              data: {
                workspace_id: workspace.id,
                user_id: user.id,
                tenant_id: organization.id,
              },
            });
            // attach role
            const role = await this.attachRole({
              user_id: user.id,
              role_id: role_id,
            });
            return user;
          } else {
            return false;
          }
        } else {
          return false;
        }
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * create user under a tenant
   * @param param0
   * @returns
   */
  static async createUser({
    username,
    email,
    password,
    tenant_id,
    role_id = null,
  }) {
    try {
      password = await bcrypt.hash(password, appConfig().security.salt);
      const user = await prisma.user.create({
        data: {
          username: username,
          email: email,
          tenant_id: tenant_id,
          password: password,
        },
      });
      if (user) {
        if (role_id) {
          // attach role
          const role = await this.attachRole({
            user_id: user.id,
            role_id: role_id,
          });
        }

        return user;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get subscription details
   * @param userId
   * @returns
   */
  static async getSubscriptionDetails(userId: number) {
    const tenant_id = await this.getTenantId(userId);
    const subscription = await prisma.subscription.findFirst({
      where: {
        tenant_id: tenant_id,
      },
      include: {
        plan: true,
      },
    });
    return subscription;
  }
}
