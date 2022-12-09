import { PartialType } from '@nestjs/swagger';
import { CreateWorkspaceChannelDto } from './create-workspace-channel.dto';

export class UpdateWorkspaceChannelDto extends PartialType(
  CreateWorkspaceChannelDto,
) {
  avatar?: string;
  address?: string;
  description?: string;
  email?: string;
  vertical?: string;
  website_1?: string;
  website_2?: string;
}
