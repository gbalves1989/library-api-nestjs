import {
  ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UpdateService } from '../services/update.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { UserResponseDTO } from '../dto/responses/user.response.dto';
import { ExceptionResponseDTO } from '../../common/filters/dto/http-exception.dto';
import { GetCurrentUser } from '../../auth/decorators/auth.decorator';
import { UserUpdateRequestDto } from '../dto/requests/user.update.request.dto';
import { IAuth } from '../../auth/interfaces/auth.interface';

@ApiTags('User')
@Controller('/api/v1/user')
export class UpdateController {
  constructor(private readonly updateService: UpdateService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('/update')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiConsumes('application/json')
  @ApiOperation({
    summary: 'Update user',
    description: 'Update user',
  })
  @ApiAcceptedResponse({
    description: 'User updated with success',
    type: UserResponseDTO,
  })
  @ApiBadRequestResponse({
    description: 'Request invalid',
    type: ExceptionResponseDTO,
  })
  update(
    @GetCurrentUser() currentUser: IAuth,
    @Body() updateUserRequestDto: UserUpdateRequestDto,
  ) {
    return this.updateService.update(currentUser, updateUserRequestDto);
  }
}
