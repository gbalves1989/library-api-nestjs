import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CategoryResponseDto } from '../dto/responses/category.response.dto';
import { ExceptionResponseDTO } from '../../common/filters/dto/http-exception.dto';
import { GetCurrentUser } from '../../auth/decorators/auth.decorator';
import { DeleteService } from '../services/delete.service';
import { IAuth } from '../../auth/interfaces/auth.interface';

@ApiTags('Categories')
@Controller('/api/v1/category')
export class DestroyController {
  constructor(private readonly deleteService: DeleteService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':categoryId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiConsumes('application/json')
  @ApiOperation({
    summary: 'Delete category',
    description: 'Delete category',
  })
  @ApiNoContentResponse({
    description: 'Category deleted with success',
    type: CategoryResponseDto,
  })
  @ApiForbiddenResponse({
    description: "User don't have permission to access this resource",
    type: ExceptionResponseDTO,
  })
  destroy(
    @GetCurrentUser() currentUser: IAuth,
    @Param('categoryId') categoryId: string,
  ) {
    return this.deleteService.delete(currentUser, categoryId);
  }
}
