import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class DeleteRepository {
  constructor(private prisma: DatabaseService) {}

  async delete(bookId: string): Promise<void> {
    await this.prisma.book.delete({
      where: { id: bookId },
    });
  }
}
