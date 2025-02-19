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
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ExceptionResponseDTO } from '../../common/filters/dto/http-exception.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import multerConfig from '../../common/storage/multer.storage';
import { GetCurrentUser } from '../../auth/decorators/auth.decorator';
import { IAuth } from '../../auth/interfaces/auth.interface';
import { UploadBannerService } from '../services/uploadbanner.service';
import { BookResponseDto } from '../dto/responses/book.response.dto';

@ApiTags('Books')
@Controller('/api/v1/book')
export class UploadBannerController {
  constructor(private readonly uploadBannerService: UploadBannerService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('/upload/:bookId')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        banner: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOperation({
    summary: 'Upload banner by book',
    description: 'Upload banner by book',
  })
  @ApiAcceptedResponse({
    description: 'Banner uploaded with success',
    type: BookResponseDto,
  })
  @ApiForbiddenResponse({
    description: "User don't have permission to access this resource",
    type: ExceptionResponseDTO,
  })
  @ApiNotFoundResponse({
    description: 'Banner not found | Book not found',
    type: ExceptionResponseDTO,
  })
  @ApiUnprocessableEntityResponse({
    description: 'File is required',
    type: ExceptionResponseDTO,
  })
  @UseInterceptors(FileInterceptor('banner', multerConfig))
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
    banner: Express.Multer.File,
    @GetCurrentUser() currentUser: IAuth,
    @Param('bookId') bookId: string,
  ) {
    return this.uploadBannerService.uploadBanner(currentUser, bookId, banner);
  }
}
