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
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UpdateService } from '../services/update.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { AuthorResponseDto } from '../dto/responses/author.response.dto';
import { ExceptionResponseDTO } from '../../common/filters/dto/http-exception.dto';
import { GetCurrentUser } from '../../auth/decorators/auth.decorator';
import { AuthorUpdateRequestDto } from '../dto/requests/author.update.request.dto';
import { IAuth } from '../../auth/interfaces/auth.interface';

@ApiTags('Authors')
@Controller('/api/v1/author')
export class UpdateController {
  constructor(private readonly updateService: UpdateService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':authorId')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiConsumes('application/json')
  @ApiOperation({
    summary: 'Update author',
    description: 'Update author',
  })
  @ApiAcceptedResponse({
    description: 'Author updated with success',
    type: AuthorResponseDto,
  })
  @ApiForbiddenResponse({
    description: "User don't have permission to access this resource",
    type: ExceptionResponseDTO,
  })
  @ApiConflictResponse({
    description: 'This author name already exists',
    type: ExceptionResponseDTO,
  })
  @ApiNotFoundResponse({
    description: 'Author not found',
    type: ExceptionResponseDTO,
  })
  @ApiBadRequestResponse({
    description: 'Request invalid',
    type: ExceptionResponseDTO,
  })
  update(
    @GetCurrentUser() currentUser: IAuth,
    @Param('authorId') authorId: string,
    @Body() authorUpdateRequestDto: AuthorUpdateRequestDto,
  ) {
    return this.updateService.update(
      currentUser,
      authorId,
      authorUpdateRequestDto,
    );
  }
}
