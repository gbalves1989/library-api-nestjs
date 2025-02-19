import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SignUpService } from '../services/signup.service';
import { UserResponseDTO } from '../../user/dto/responses/user.response.dto';
import { ExceptionResponseDTO } from '../../common/filters/dto/http-exception.dto';
import { UserCreateRequestDTO } from '../../user/dto/requests/user.create.request.dto';

@ApiTags('Authentication')
@Controller('/api/v1/auth')
export class SignUpController {
  constructor(private readonly signUpService: SignUpService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiConsumes('application/json')
  @ApiOperation({
    summary: 'Create user',
    description: 'Create a new user',
  })
  @ApiCreatedResponse({
    description: 'User created with success',
    type: UserResponseDTO,
  })
  @ApiConflictResponse({
    description: 'This e-mail already to created',
    type: ExceptionResponseDTO,
  })
  @ApiBadRequestResponse({
    description: 'Request invalid',
    type: ExceptionResponseDTO,
  })
  signUp(@Body() userCreateRequestDto: UserCreateRequestDTO) {
    return this.signUpService.signUp(userCreateRequestDto);
  }
}
