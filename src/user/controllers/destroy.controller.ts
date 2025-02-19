import {
  ApiBearerAuth,
  ApiConsumes,
  ApiForbiddenResponse,
  ApiNoContentResponse,
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
import { UserResponseDTO } from '../dto/responses/user.response.dto';
import { ExceptionResponseDTO } from '../../common/filters/dto/http-exception.dto';
import { GetCurrentUser } from '../../auth/decorators/auth.decorator';
import { IAuth } from '../../auth/interfaces/auth.interface';

@ApiTags('User')
@Controller('/api/v1/user')
export class DestroyController {
  constructor(private readonly deleteService: DeleteService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':email')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiConsumes('application/json')
  @ApiOperation({
    summary: 'Delete user',
    description: 'Delete user',
  })
  @ApiNoContentResponse({
    description: 'User deleted with success',
    type: UserResponseDTO,
  })
  @ApiForbiddenResponse({
    description: "User don't have permission to access this resource",
    type: ExceptionResponseDTO,
  })
  destroy(
    @GetCurrentUser() currentUser: IAuth,
    @Param('email') emailClient: string,
  ) {
    return this.deleteService.delete(currentUser, emailClient);
  }
}
