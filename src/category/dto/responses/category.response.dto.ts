import { ApiProperty } from '@nestjs/swagger';

export class CategoryResponseDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly Book: [];
}

export class CategoryListResponseDto {
  @ApiProperty()
  readonly data: [];

  @ApiProperty()
  readonly meta: object;
}
