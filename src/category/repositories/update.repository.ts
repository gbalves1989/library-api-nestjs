import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { CategoryUpdateRequestDto } from '../dto/requests/category.update.request.dto';
import { ICategory } from '../interfaces/category.interface';

@Injectable()
export class UpdateRepository {
  constructor(private prisma: DatabaseService) {}

  async update(
    categoryId: string,
    categoryUpdateRequestDto: CategoryUpdateRequestDto,
  ): Promise<ICategory> {
    return this.prisma.category.update({
      where: { id: categoryId },
      data: { ...categoryUpdateRequestDto },
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
