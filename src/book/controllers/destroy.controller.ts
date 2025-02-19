import {
  ApiBearerAuth,
  ApiConsumes,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ExceptionResponseDTO } from '../../common/filters/dto/http-exception.dto';
import { GetCurrentUser } from '../../auth/decorators/auth.decorator';
import { IAuth } from '../../auth/interfaces/auth.interface';
import { DeleteService } from '../services/delete.service';
import { BookResponseDto } from '../dto/responses/book.response.dto';

@ApiTags('Books')
@Controller('/api/v1/book')
export class DestroyController {
  constructor(private readonly deleteService: DeleteService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':bookId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiConsumes('application/json')
  @ApiOperation({
    summary: 'Delete book',
    description: 'Delete book',
  })
  @ApiNoContentResponse({
    description: 'Book deleted with success',
    type: BookResponseDto,
  })
  @ApiForbiddenResponse({
    description: "User don't have permission to access this resource",
    type: ExceptionResponseDTO,
  })
  @ApiNotFoundResponse({
    description: 'Banner not found | Book not found',
    type: ExceptionResponseDTO,
  })
  destroy(
    @GetCurrentUser() currentUser: IAuth,
    @Param('bookId') bookId: string,
  ) {
    return this.deleteService.delete(currentUser, bookId);
  }
}
