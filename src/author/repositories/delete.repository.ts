import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class DeleteRepository {
  constructor(private prisma: DatabaseService) {}

  async delete(authorId: string): Promise<void> {
    await this.prisma.author.delete({
      where: { id: authorId },
    });
  }
}
