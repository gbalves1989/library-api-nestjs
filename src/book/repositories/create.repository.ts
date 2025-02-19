import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { BookCreateRequestDto } from '../dto/requests/book.create.request.dto';
import { IBook } from '../interfaces/book.interface';

@Injectable()
export class CreateRepository {
  constructor(private prisma: DatabaseService) {}

  async create(bookCreateRequestDto: BookCreateRequestDto): Promise<IBook> {
    return this.prisma.book.create({
      data: { ...bookCreateRequestDto },
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
