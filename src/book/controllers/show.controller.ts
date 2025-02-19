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
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ExceptionResponseDTO } from '../../common/filters/dto/http-exception.dto';
import { FindByIdService } from '../services/findbyid.service';
import { BookResponseDto } from '../dto/responses/book.response.dto';

@ApiTags('Books')
@Controller('/api/v1/book')
export class ShowController {
  constructor(private readonly findByIdService: FindByIdService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':bookId')
  @HttpCode(HttpStatus.OK)
  @ApiConsumes('application/json')
  @ApiOperation({
    summary: 'Return book by id',
    description: 'Return book by id',
  })
  @ApiOkResponse({
    description: 'Book returned with success',
    type: BookResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Book not found',
    type: ExceptionResponseDTO,
  })
  show(@Param('bookId') bookId: string) {
    return this.findByIdService.findById(bookId);
  }
}
