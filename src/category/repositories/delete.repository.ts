import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class DeleteRepository {
  constructor(private prisma: DatabaseService) {}

  async delete(categoryId: string): Promise<void> {
    await this.prisma.category.delete({
      where: { id: categoryId },
    });
  }
}
