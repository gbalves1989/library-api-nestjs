import { ApiProperty } from '@nestjs/swagger';

export class AuthorResponseDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly avatar: string;

  @ApiProperty()
  readonly Book: [];
}

export class AuthorListResponseDto {
  @ApiProperty()
  readonly data: [];

  @ApiProperty()
  readonly meta: object;
}
