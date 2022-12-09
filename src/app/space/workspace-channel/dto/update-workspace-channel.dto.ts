import { PartialType } from '@nestjs/swagger';
import { CreateWorkspaceChannelDto } from './create-workspace-channel.dto';

export class UpdateWorkspaceChannelDto extends PartialType(CreateWorkspaceChannelDto) {}
