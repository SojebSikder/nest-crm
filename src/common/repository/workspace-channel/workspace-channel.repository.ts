import { PrismaClient } from '@prisma/client';
import { DateHelper } from 'src/common/helper/date.helper';
import { v4 as uuid } from 'uuid';
import { UserRepository } from '../user/user.repository';

const prisma = new PrismaClient();

export class WorkspaceChannelRepository {
  /**
   * get workspace channel details
   * @returns
   */
  static async getDetails({
    channel_id,
    user_id,
    workspace_id,
  }: {
    channel_id: number;
    user_id: number;
    workspace_id: number;
  }) {
    channel_id = Number(channel_id);
    workspace_id = Number(workspace_id);
    const tenant_id = await UserRepository.getTenantId({ userId: user_id });

    const workspaceChannel = await prisma.workspaceChannel.findFirst({
      where: {
        AND: [
          {
            channel_id: channel_id,
          },
          {
            workspace_id: workspace_id,
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
