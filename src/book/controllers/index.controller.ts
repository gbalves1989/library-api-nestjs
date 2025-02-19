import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { FindAllService } from '../services/findall.service';
import { BookListResponseDto } from '../dto/responses/book.response.dto';

@ApiTags('Books')
@Controller('/api/v1/book')
export class IndexController {
  constructor(private readonly findAllService: FindAllService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiConsumes('application/json')
  @ApiQuery({
    name: 'page',
    required: true,
  })
  @ApiOperation({
    summary: 'List of books',
    description: 'Return a list of books',
  })
  @ApiOkResponse({
    description: 'List of books returned with success',
    type: BookListResponseDto,
  })
  index(@Query('page') page: number) {
    return this.findAllService.findAll(page);
  }
}
