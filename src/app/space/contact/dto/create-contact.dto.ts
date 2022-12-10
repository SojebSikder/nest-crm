import { ApiProperty } from '@nestjs/swagger';

export class CreateContactDto {
  @ApiProperty()
  fname: string;

  @ApiProperty()
  lname: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone_number: string;

  @ApiProperty()
  country_id: number;

  @ApiProperty()
  assignee_id: number;
}
