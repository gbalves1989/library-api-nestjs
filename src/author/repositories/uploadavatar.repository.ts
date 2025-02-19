import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { IAuthor } from '../interfaces/author.interface';

@Injectable()
export class UploadAvatarRepository {
  constructor(private prisma: DatabaseService) {}

  async uploadAvatar(authorId: string, avatar: string): Promise<IAuthor> {
    return this.prisma.author.update({
      where: { id: authorId },
      data: { avatar },
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
