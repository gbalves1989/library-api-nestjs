import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CategoryResponseDto } from '../dto/responses/category.response.dto';
import { ExceptionResponseDTO } from '../../common/filters/dto/http-exception.dto';
import { FindByIdService } from '../services/findbyid.service';

@ApiTags('Categories')
@Controller('/api/v1/category')
export class ShowController {
  constructor(private readonly findByIdService: FindByIdService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':categoryId')
  @HttpCode(HttpStatus.OK)
  @ApiConsumes('application/json')
  @ApiOperation({
    summary: 'Return category by id',
    description: 'Return category by id',
  })
  @ApiOkResponse({
    description: 'Category returned with success',
    type: CategoryResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Category not found',
    type: ExceptionResponseDTO,
  })
  show(@Param('categoryId') categoryId: string) {
    return this.findByIdService.findById(categoryId);
  }
}
