import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateConversationDto } from './create-conversation.dto';

export class UpdateConversationDto extends PartialType(CreateConversationDto) {
  @ApiProperty()
  is_open: boolean;
}
