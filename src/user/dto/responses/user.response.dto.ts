import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDTO {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly avatar: string;

  @ApiProperty()
  readonly isAdmin: string;
}
