import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { CategoryCreateRequestDto } from '../dto/requests/category.create.request.dto';
import { ICategory } from '../interfaces/category.interface';

@Injectable()
export class CreateRepository {
  constructor(private prisma: DatabaseService) {}

  async create(
    categoryCreateRequestDto: CategoryCreateRequestDto,
  ): Promise<ICategory> {
    return this.prisma.category.create({
      data: { ...categoryCreateRequestDto },
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
