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
import { CreateService } from '../services/create.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { AuthorResponseDto } from '../dto/responses/author.response.dto';
import { ExceptionResponseDTO } from '../../common/filters/dto/http-exception.dto';
import { GetCurrentUser } from '../../auth/decorators/auth.decorator';
import { AuthorCreateRequestDto } from '../dto/requests/author.create.request.dto';
import { IAuth } from '../../auth/interfaces/auth.interface';

@ApiTags('Authors')
@Controller('/api/v1/author')
export class StoreController {
  constructor(private readonly createService: CreateService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiConsumes('application/json')
  @ApiOperation({
    summary: 'Create author',
    description: 'Create a new author',
  })
  @ApiCreatedResponse({
    description: 'Author created with success',
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
  @ApiBadRequestResponse({
    description: 'Request invalid',
    type: ExceptionResponseDTO,
  })
  store(
    @GetCurrentUser() currentUser: IAuth,
    @Body() authorCreateRequestDto: AuthorCreateRequestDto,
  ) {
    return this.createService.create(currentUser, authorCreateRequestDto);
  }
}
