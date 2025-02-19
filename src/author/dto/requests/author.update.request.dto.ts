import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthorUpdateRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
