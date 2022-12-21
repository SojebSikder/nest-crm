import { ApiProperty } from '@nestjs/swagger';

export class CreateWorkspaceChannelDto {
  @ApiProperty()
  access_token: string;

  @ApiProperty()
  account_id: string;

  @ApiProperty()
  phone_number: string;
}
