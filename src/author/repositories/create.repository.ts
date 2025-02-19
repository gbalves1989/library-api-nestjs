import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { AuthorCreateRequestDto } from '../dto/requests/author.create.request.dto';
import { IAuthor } from '../interfaces/author.interface';

@Injectable()
export class CreateRepository {
  constructor(private prisma: DatabaseService) {}

  async create(
    authorCreateRequestDto: AuthorCreateRequestDto,
  ): Promise<IAuthor> {
    return this.prisma.author.create({
      data: { ...authorCreateRequestDto },
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
