import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CategoryResponseDto } from '../dto/responses/category.response.dto';
import { ExceptionResponseDTO } from '../../common/filters/dto/http-exception.dto';
import { GetCurrentUser } from '../../auth/decorators/auth.decorator';
import { CategoryCreateRequestDto } from '../dto/requests/category.create.request.dto';
import { CreateService } from '../services/create.service';
import { IAuth } from '../../auth/interfaces/auth.interface';

@ApiTags('Categories')
@Controller('/api/v1/category')
export class StoreController {
  constructor(private readonly createService: CreateService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiConsumes('application/json')
  @ApiOperation({
    summary: 'Create category',
    description: 'Create a new category',
  })
  @ApiCreatedResponse({
    description: 'Category created with success',
    type: CategoryResponseDto,
  })
  @ApiForbiddenResponse({
    description: "User don't have permission to access this resource",
    type: ExceptionResponseDTO,
  })
  @ApiConflictResponse({
    description: 'This category name already exists',
    type: ExceptionResponseDTO,
  })
  @ApiBadRequestResponse({
    description: 'Request invalid',
    type: ExceptionResponseDTO,
  })
  store(
    @GetCurrentUser() currentUser: IAuth,
    @Body() categoryCreateRequestDto: CategoryCreateRequestDto,
  ) {
    return this.createService.create(currentUser, categoryCreateRequestDto);
  }
}
