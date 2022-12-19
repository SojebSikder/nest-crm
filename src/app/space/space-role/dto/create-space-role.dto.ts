import { ApiProperty } from '@nestjs/swagger';

export class CreateSpaceRoleDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  permissions: number[];
}
