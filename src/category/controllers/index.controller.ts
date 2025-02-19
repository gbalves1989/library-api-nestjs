import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CategoryListResponseDto } from '../dto/responses/category.response.dto';
import { FindAllService } from '../services/findall.service';

@ApiTags('Categories')
@Controller('/api/v1/category')
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
    type: Number,
  })
  @ApiOperation({
    summary: 'List of categories',
    description: 'Return a list of categories',
  })
  @ApiOkResponse({
    description: 'Category created with success',
    type: CategoryListResponseDto,
  })
  index(@Query('page') page: number) {
    return this.findAllService.findAll(page);
  }
}
