import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UserResponseDTO } from '../../user/dto/responses/user.response.dto';
import { ExceptionResponseDTO } from '../../common/filters/dto/http-exception.dto';
import { GetCurrentUser } from '../decorators/auth.decorator';
import { IAuth } from '../interfaces/auth.interface';
import { MeService } from '../services/me.service';

@ApiTags('Authentication')
@Controller('/api/v1/auth')
export class MeController {
  constructor(private readonly meService: MeService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('me')
  @HttpCode(HttpStatus.OK)
  @ApiConsumes('application/json')
  @ApiOperation({
    summary: 'User detail logged',
    description: 'Return details to user logged',
  })
  @ApiOkResponse({
    description: 'Returned details to user logged',
    type: UserResponseDTO,
  })
  @ApiUnauthorizedResponse({
    description: 'Not authorized',
    type: ExceptionResponseDTO,
  })
  show(@GetCurrentUser() currentUser: IAuth) {
    return this.meService.me(currentUser);
  }
}
