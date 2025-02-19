import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ICategory } from '../interfaces/category.interface';
import { DeleteRepository } from '../repositories/delete.repository';
import { FindByIdRepository } from '../repositories/findbyid.repository';
import { IAuth } from '../../auth/interfaces/auth.interface';

@Injectable()
export class DeleteService {
  constructor(
    private readonly deleteRepository: DeleteRepository,
    private readonly findByIdRepository: FindByIdRepository,
  ) {}

  async delete(currentUser: IAuth, categoryId: string): Promise<void> {
    if (!currentUser.isAdmin) {
      throw new ForbiddenException("User don't have access this resource");
    }

    const category: ICategory =
      await this.findByIdRepository.findById(categoryId);

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    await this.deleteRepository.delete(categoryId);
  }
}
