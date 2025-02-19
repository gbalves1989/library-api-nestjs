import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiConsumes,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CategoryResponseDto } from '../dto/responses/category.response.dto';
import { ExceptionResponseDTO } from '../../common/filters/dto/http-exception.dto';
import { GetCurrentUser } from '../../auth/decorators/auth.decorator';
import { CategoryUpdateRequestDto } from '../dto/requests/category.update.request.dto';
import { UpdateService } from '../services/update.service';
import { IAuth } from '../../auth/interfaces/auth.interface';

@ApiTags('Categories')
@Controller('/api/v1/category')
export class UpdateController {
  constructor(private readonly updateService: UpdateService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':categoryId')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiConsumes('application/json')
  @ApiOperation({
    summary: 'Update category',
    description: 'Update category',
  })
  @ApiAcceptedResponse({
    description: 'Category updated with success',
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
  @ApiNotFoundResponse({
    description: 'Category not found',
    type: ExceptionResponseDTO,
  })
  @ApiBadRequestResponse({
    description: 'Request invalid',
    type: ExceptionResponseDTO,
  })
  update(
    @GetCurrentUser() currentUser: IAuth,
    @Param('categoryId') categoryId: string,
    @Body() categoryUpdateRequestDto: CategoryUpdateRequestDto,
  ) {
    return this.updateService.update(
      currentUser,
      categoryId,
      categoryUpdateRequestDto,
    );
  }
}
