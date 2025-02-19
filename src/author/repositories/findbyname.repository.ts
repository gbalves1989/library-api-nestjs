import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { IAuthor } from '../interfaces/author.interface';

@Injectable()
export class FindByNameRepository {
  constructor(private prisma: DatabaseService) {}

  async findByName(name: string): Promise<IAuthor> {
    return this.prisma.author.findUnique({
      where: { name },
      select: {
        id: true,
        name: true,
        avatar: true,
        Book: {
          select: {
            id: true,
            name: true,
            description: true,
            banner: true,
            categoryId: true,
          },
        },
      },
    });
  }
}
