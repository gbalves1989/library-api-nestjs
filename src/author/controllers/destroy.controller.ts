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
import { DeleteService } from '../services/delete.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { AuthorResponseDto } from '../dto/responses/author.response.dto';
import { ExceptionResponseDTO } from '../../common/filters/dto/http-exception.dto';
import { GetCurrentUser } from '../../auth/decorators/auth.decorator';
import { IAuth } from '../../auth/interfaces/auth.interface';

@ApiTags('Authors')
@Controller('/api/v1/author')
export class DestroyController {
  constructor(private readonly deleteService: DeleteService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':authorId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiConsumes('application/json')
  @ApiOperation({
    summary: 'Delete author',
    description: 'Delete author',
  })
  @ApiNoContentResponse({
    description: 'Author deleted with success',
    type: AuthorResponseDto,
  })
  @ApiForbiddenResponse({
    description: "User don't have permission to access this resource",
    type: ExceptionResponseDTO,
  })
  @ApiNotFoundResponse({
    description: 'Avatar not found | Author not found',
    type: ExceptionResponseDTO,
  })
  destroy(
    @GetCurrentUser() currentUser: IAuth,
    @Param('authorId') authorId: string,
  ) {
    return this.deleteService.delete(currentUser, authorId);
  }
}
