import { PrismaClient } from '@prisma/client';
import { UserRepository } from '../user/user.repository';

const prisma = new PrismaClient();

export class WorkspaceChannelRepository {
  /**
   * get workspace channel details
   * @returns
   */
  static async getDetails({
    id,
    user_id,
    workspace_id,
  }: {
    id: number;
    user_id: number;
    workspace_id: number;
  }) {
    workspace_id = Number(workspace_id);
    const tenant_id = await UserRepository.getTenantId(user_id);

    const workspaceChannel = await prisma.workspaceChannel.findFirst({
      where: {
        AND: [
          {
            id: Number(id),
          },
          {
            workspace_id: Number(workspace_id),
          },
          {
            tenant_id: tenant_id,
          },
        ],
      },
    });
    return workspaceChannel;
  }
}
