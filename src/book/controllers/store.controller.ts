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
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ExceptionResponseDTO } from '../../common/filters/dto/http-exception.dto';
import { GetCurrentUser } from '../../auth/decorators/auth.decorator';
import { IAuth } from '../../auth/interfaces/auth.interface';
import { CreateService } from '../services/create.service';
import { BookResponseDto } from '../dto/responses/book.response.dto';
import { BookCreateRequestDto } from '../dto/requests/book.create.request.dto';

@ApiTags('Books')
@Controller('/api/v1/book')
export class StoreController {
  constructor(private readonly createService: CreateService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiConsumes('application/json')
  @ApiOperation({
    summary: 'Create book',
    description: 'Create a new book',
  })
  @ApiCreatedResponse({
    description: 'Book created with success',
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
  @ApiBadRequestResponse({
    description: 'Request invalid',
    type: ExceptionResponseDTO,
  })
  store(
    @GetCurrentUser() currentUser: IAuth,
    @Body() bookCreateRequestDto: BookCreateRequestDto,
  ) {
    return this.createService.create(currentUser, bookCreateRequestDto);
  }
}
