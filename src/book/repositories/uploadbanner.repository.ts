import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { IBook } from '../interfaces/book.interface';

@Injectable()
export class UploadBannerRepository {
  constructor(private prisma: DatabaseService) {}

  async uploadBanner(bookId: string, banner: string): Promise<IBook> {
    return this.prisma.book.update({
      where: { id: bookId },
      data: { banner: banner },
      select: {
        id: true,
        name: true,
        description: true,
        banner: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });
  }
}
