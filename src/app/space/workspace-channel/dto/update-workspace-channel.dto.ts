import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateWorkspaceChannelDto } from './create-workspace-channel.dto';

export class UpdateWorkspaceChannelDto extends PartialType(
  CreateWorkspaceChannelDto,
) {
  @ApiProperty()
  avatar?: string;

  @ApiProperty()
  address?: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  email?: string;

  @ApiProperty()
  vertical?: string;

  @ApiProperty()
  website_1?: string;

  @ApiProperty()
  website_2?: string;
}
