import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { AuthorUpdateRequestDto } from '../dto/requests/author.update.request.dto';
import { IAuthor } from '../interfaces/author.interface';

@Injectable()
export class UpdateRepository {
  constructor(private prisma: DatabaseService) {}

  async update(
    authorId: string,
    authorUpdateRequestDto: AuthorUpdateRequestDto,
  ): Promise<IAuthor> {
    return this.prisma.author.update({
      where: { id: authorId },
      data: { ...authorUpdateRequestDto },
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
