import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CategoryUpdateRequestDto } from '../dto/requests/category.update.request.dto';
import { ICategory } from '../interfaces/category.interface';
import { UpdateRepository } from '../repositories/update.repository';
import { FindByIdRepository } from '../repositories/findbyid.repository';
import { IAuth } from '../../auth/interfaces/auth.interface';

@Injectable()
export class UpdateService {
  constructor(
    private readonly updateRepository: UpdateRepository,
    private readonly findByIdRepository: FindByIdRepository,
  ) {}

  async update(
    currentUser: IAuth,
    categoryId: string,
    categoryUpdateRequestDto: CategoryUpdateRequestDto,
  ): Promise<ICategory> {
    if (!currentUser.isAdmin) {
      throw new ForbiddenException("User don't have access this resource");
    }

    const category: ICategory =
      await this.findByIdRepository.findById(categoryId);

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    if (category.name === categoryUpdateRequestDto.name) {
      throw new ConflictException('This category name already exists');
    }

    return await this.updateRepository.update(
      categoryId,
      categoryUpdateRequestDto,
    );
  }
}
