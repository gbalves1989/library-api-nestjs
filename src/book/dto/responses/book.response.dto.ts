import { ApiProperty } from '@nestjs/swagger';

export class BookResponseDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly banner: string;

  @ApiProperty()
  readonly category: object;

  @ApiProperty()
  readonly author: object;

  @ApiProperty()
  readonly Reserve: [];
}

export class BookListResponseDto {
  @ApiProperty()
  readonly data: [];

  @ApiProperty()
  readonly meta: object;
}
