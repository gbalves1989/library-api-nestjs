import { Injectable, NotFoundException } from '@nestjs/common';
import { ICategory } from '../interfaces/category.interface';
import { FindByIdRepository } from '../repositories/findbyid.repository';

@Injectable()
export class FindByIdService {
  constructor(private readonly findByIdRepository: FindByIdRepository) {}

  async findById(categoryId: string): Promise<ICategory> {
    const category: ICategory =
      await this.findByIdRepository.findById(categoryId);

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }
}
