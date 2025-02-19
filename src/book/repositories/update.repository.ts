import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { IBook } from '../interfaces/book.interface';
import { BookUpdateRequestDto } from '../dto/requests/book.update.request.dto';

@Injectable()
export class UpdateRepository {
  constructor(private prisma: DatabaseService) {}

  async update(
    bookId: string,
    bookUpdateRequestDto: BookUpdateRequestDto,
  ): Promise<IBook> {
    return this.prisma.book.update({
      where: { id: bookId },
      data: { ...bookUpdateRequestDto },
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
