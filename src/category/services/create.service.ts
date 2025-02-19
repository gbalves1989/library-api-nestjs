import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CategoryCreateRequestDto } from '../dto/requests/category.create.request.dto';
import { ICategory } from '../interfaces/category.interface';
import { CreateRepository } from '../repositories/create.repository';
import { FindByNameRepository } from '../repositories/findbyname.repository';
import { IAuth } from '../../auth/interfaces/auth.interface';

@Injectable()
export class CreateService {
  constructor(
    private readonly createRepository: CreateRepository,
    private readonly findByNameRepository: FindByNameRepository,
  ) {}

  async create(
    currentUser: IAuth,
    categoryCreateRequestDto: CategoryCreateRequestDto,
  ): Promise<ICategory> {
    if (!currentUser.isAdmin) {
      throw new ForbiddenException("User don't have access this resource");
    }

    const category: ICategory = await this.findByNameRepository.findByName(
      categoryCreateRequestDto.name,
    );

    if (category) {
      throw new ConflictException('This category name already exists');
    }

    return await this.createRepository.create(categoryCreateRequestDto);
  }
}
