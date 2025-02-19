import {
  ApiAcceptedResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import {
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Patch,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UploadAvatarService } from '../services/uploadavatar.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { AuthorResponseDto } from '../dto/responses/author.response.dto';
import { ExceptionResponseDTO } from '../../common/filters/dto/http-exception.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetCurrentUser } from '../../auth/decorators/auth.decorator';
import multerConfig from '../../common/storage/multer.storage';
import { IAuth } from '../../auth/interfaces/auth.interface';

@ApiTags('Authors')
@Controller('/api/v1/author')
export class UploadAvatarController {
  constructor(private readonly uploadAvatarService: UploadAvatarService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('/upload/:authorId')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        avatar: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOperation({
    summary: 'Upload avatar by author',
    description: 'Upload avatar by author',
  })
  @ApiAcceptedResponse({
    description: 'Avatar uploaded with success',
    type: AuthorResponseDto,
  })
  @ApiForbiddenResponse({
    description: "User don't have permission to access this resource",
    type: ExceptionResponseDTO,
  })
  @ApiNotFoundResponse({
    description: 'Avatar not found | Author not found',
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
    @Param('authorId') authorId: string,
  ) {
    return this.uploadAvatarService.uploadAvatar(currentUser, authorId, avatar);
  }
}
