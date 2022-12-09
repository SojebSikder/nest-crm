import { Module } from '@nestjs/common';
import { WorkspaceChannelService } from './workspace-channel.service';
import { WorkspaceChannelController } from './workspace-channel.controller';

@Module({
  controllers: [WorkspaceChannelController],
  providers: [WorkspaceChannelService]
})
export class WorkspaceChannelModule {}
