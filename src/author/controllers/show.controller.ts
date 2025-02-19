import {
  ApiBearerAuth,
  ApiConsumes,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { FindByIdService } from '../services/findbyid.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { AuthorResponseDto } from '../dto/responses/author.response.dto';
import { ExceptionResponseDTO } from '../../common/filters/dto/http-exception.dto';

@ApiTags('Authors')
@Controller('/api/v1/author')
export class ShowController {
  constructor(private readonly findByIdService: FindByIdService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':authorId')
  @HttpCode(HttpStatus.OK)
  @ApiConsumes('application/json')
  @ApiOperation({
    summary: 'Return author by id',
    description: 'Return author by id',
  })
  @ApiOkResponse({
    description: 'Author returned with success',
    type: AuthorResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Author not found',
    type: ExceptionResponseDTO,
  })
  show(@Param('authorId') authorId: string) {
    return this.findByIdService.findById(authorId);
  }
}
