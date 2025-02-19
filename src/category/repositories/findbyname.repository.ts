import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { ICategory } from '../interfaces/category.interface';

@Injectable()
export class FindByNameRepository {
  constructor(private prisma: DatabaseService) {}

  async findByName(name: string): Promise<ICategory> {
    return this.prisma.category.findUnique({
      where: { name },
      select: {
        id: true,
        name: true,
        Book: {
          select: {
            id: true,
            name: true,
            description: true,
            banner: true,
            authorId: true,
          },
        },
      },
    });
  }
}
