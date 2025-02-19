import {
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SignInService } from '../services/signin.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthResponseDTO } from '../dto/responses/auth.response.dto';
import { ExceptionResponseDTO } from '../../common/filters/dto/http-exception.dto';

@ApiTags('Authentication')
@Controller('/api/v1/auth')
export class SignInController {
  constructor(private readonly signInService: SignInService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ApiConsumes('application/json')
  @ApiOperation({
    summary: 'Token access',
    description: 'Return token access',
  })
  @ApiOkResponse({
    description: 'Logged with success',
    type: AuthResponseDTO,
  })
  @ApiUnauthorizedResponse({
    description: 'Credencials invalid',
    type: ExceptionResponseDTO,
  })
  signIn(@Req() req) {
    return this.signInService.signIn(req.user);
  }
}
