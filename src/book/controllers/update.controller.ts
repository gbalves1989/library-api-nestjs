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
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ExceptionResponseDTO } from '../../common/filters/dto/http-exception.dto';
import { GetCurrentUser } from '../../auth/decorators/auth.decorator';
import { IAuth } from '../../auth/interfaces/auth.interface';
import { UpdateService } from '../services/update.service';
import { BookResponseDto } from '../dto/responses/book.response.dto';
import { BookUpdateRequestDto } from '../dto/requests/book.update.request.dto';

@ApiTags('Books')
@Controller('/api/v1/book')
export class UpdateController {
  constructor(private readonly updateService: UpdateService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':bookId')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiConsumes('application/json')
  @ApiOperation({
    summary: 'Update book',
    description: 'Update book',
  })
  @ApiAcceptedResponse({
    description: 'Book updated with success',
    type: BookResponseDto,
  })
  @ApiForbiddenResponse({
    description: "User don't have permission to access this resource",
    type: ExceptionResponseDTO,
  })
  @ApiConflictResponse({
    description: 'This book name already exists',
    type: ExceptionResponseDTO,
  })
  @ApiNotFoundResponse({
    description: 'Book not found',
    type: ExceptionResponseDTO,
  })
  @ApiBadRequestResponse({
    description: 'Request invalid',
    type: ExceptionResponseDTO,
  })
  update(
    @GetCurrentUser() currentUser: IAuth,
    @Param('bookId') bookId: string,
    @Body() bookUpdateRequestDto: BookUpdateRequestDto,
  ) {
    return this.updateService.update(currentUser, bookId, bookUpdateRequestDto);
  }
}
