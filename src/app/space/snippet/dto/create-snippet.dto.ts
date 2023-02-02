import { ApiProperty } from '@nestjs/swagger';

export class CreateSnippetDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  message: string;
}
