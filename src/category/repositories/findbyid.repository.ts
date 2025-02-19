import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { ICategory } from '../interfaces/category.interface';

@Injectable()
export class FindByIdRepository {
  constructor(private prisma: DatabaseService) {}

  async findById(categoryId: string): Promise<ICategory> {
    return this.prisma.category.findUnique({
      where: { id: categoryId },
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
