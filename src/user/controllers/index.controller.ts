import {
  ApiBearerAuth,
  ApiConsumes,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { FindAllService } from '../services/findall.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { UserResponseDTO } from '../dto/responses/user.response.dto';
import { ExceptionResponseDTO } from '../../common/filters/dto/http-exception.dto';
import { GetCurrentUser } from '../../auth/decorators/auth.decorator';
import { IAuth } from '../../auth/interfaces/auth.interface';

@ApiTags('User')
@Controller('/api/v1/user')
export class IndexController {
  constructor(private readonly findAllService: FindAllService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiConsumes('application/json')
  @ApiOperation({
    summary: 'List of users',
    description: 'Return a list of users',
  })
  @ApiOkResponse({
    description: 'List of users returned with success',
    type: UserResponseDTO,
  })
  @ApiForbiddenResponse({
    description: "User don't have permission to access this resource",
    type: ExceptionResponseDTO,
  })
  index(@GetCurrentUser() currentUser: IAuth) {
    return this.findAllService.findAll(currentUser);
  }
}
