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
import { FindAllService } from '../services/findall.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { AuthorListResponseDto } from '../dto/responses/author.response.dto';

@ApiTags('Authors')
@Controller('/api/v1/author')
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
    summary: 'List of authors',
    description: 'Return a list of authors',
  })
  @ApiOkResponse({
    description: 'List of authors returned with success',
    type: AuthorListResponseDto,
  })
  index(@Query('page') page: number) {
    return this.findAllService.findAll(page);
  }
}
