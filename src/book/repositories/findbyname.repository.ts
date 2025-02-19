import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { IBook } from '../interfaces/book.interface';

@Injectable()
export class FindByNameRepository {
  constructor(private prisma: DatabaseService) {}

  async findByName(name: string): Promise<IBook> {
    return this.prisma.book.findUnique({
      where: { name },
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
