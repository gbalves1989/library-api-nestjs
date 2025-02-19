import {
  ApiAcceptedResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import {
  Controller,
  HttpCode,
  HttpStatus,
  ParseFilePipeBuilder,
  Patch,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UploadAvatarService } from '../services/uploadavatar.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { UserResponseDTO } from '../dto/responses/user.response.dto';
import { ExceptionResponseDTO } from '../../common/filters/dto/http-exception.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import multerConfig from '../../common/storage/multer.storage';
import { GetCurrentUser } from '../../auth/decorators/auth.decorator';
import { IAuth } from '../../auth/interfaces/auth.interface';

@ApiTags('User')
@Controller('/api/v1/user')
export class UploadAvatarController {
  constructor(private readonly uploadAvatarService: UploadAvatarService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('/upload')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        avatar: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOperation({
    summary: 'Upload avatar by user',
    description: 'Upload avatar by user',
  })
  @ApiAcceptedResponse({
    description: 'Avatar uploaded with success',
    type: UserResponseDTO,
  })
  @ApiNotFoundResponse({
    description: 'Avatar not found',
    type: ExceptionResponseDTO,
  })
  @ApiUnprocessableEntityResponse({
    description: 'File is required',
    type: ExceptionResponseDTO,
  })
  @UseInterceptors(FileInterceptor('avatar', multerConfig))
  uploadAvatar(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|png)$/,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    avatar: Express.Multer.File,
    @GetCurrentUser() currentUser: IAuth,
  ) {
    return this.uploadAvatarService.uploadAvatar(currentUser, avatar);
  }
}
