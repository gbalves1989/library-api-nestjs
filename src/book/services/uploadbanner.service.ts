import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IAuth } from '../../auth/interfaces/auth.interface';
import * as fs from 'fs';
import { UploadBannerRepository } from '../repositories/uploadbanner.repository';
import { FindByIdRepository } from '../repositories/findbyid.repository';
import { IBook } from '../interfaces/book.interface';

@Injectable()
export class UploadBannerService {
  constructor(
    private readonly uploadBannerRepository: UploadBannerRepository,
    private readonly findByIdRepository: FindByIdRepository,
  ) {}

  async uploadBanner(
    currentUser: IAuth,
    bookId: string,
    banner: Express.Multer.File,
  ): Promise<IBook> {
    if (!currentUser.isAdmin) {
      throw new ForbiddenException("User don't have access this resource");
    }

    const book: IBook = await this.findByIdRepository.findById(bookId);

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    if (book.banner) {
      fs.unlink(`./uploads/${book.banner}`, (err) => {
        if (err) {
          throw new NotFoundException('File not found');
        }
      });
    }

    return await this.uploadBannerRepository.uploadBanner(
      bookId,
      banner.filename,
    );
  }
}
