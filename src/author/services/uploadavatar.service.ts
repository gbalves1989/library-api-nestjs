import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IAuthor } from '../interfaces/author.interface';
import * as fs from 'fs';
import { UploadAvatarRepository } from '../repositories/uploadavatar.repository';
import { FindByIdRepository } from '../repositories/findbyid.repository';
import { IAuth } from '../../auth/interfaces/auth.interface';

@Injectable()
export class UploadAvatarService {
  constructor(
    private readonly uploadAvatarRepository: UploadAvatarRepository,
    private readonly findByIdRepository: FindByIdRepository,
  ) {}

  async uploadAvatar(
    currentUser: IAuth,
    authorId: string,
    avatar: Express.Multer.File,
  ): Promise<IAuthor> {
    if (!currentUser.isAdmin) {
      throw new ForbiddenException("User don't have access this resource");
    }

    const author: IAuthor = await this.findByIdRepository.findById(authorId);

    if (!author) {
      throw new NotFoundException('Author not found');
    }

    if (author.avatar) {
      fs.unlink(`./uploads/${author.avatar}`, (err) => {
        if (err) {
          throw new NotFoundException('File not found');
        }
      });
    }

    return await this.uploadAvatarRepository.uploadAvatar(
      authorId,
      avatar.filename,
    );
  }
}
