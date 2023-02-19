import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty()
  body_text: string;

  @ApiProperty()
  workspace_channel_id: number;
}
