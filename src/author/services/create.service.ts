import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CreateRepository } from '../repositories/create.repository';
import { AuthorCreateRequestDto } from '../dto/requests/author.create.request.dto';
import { IAuthor } from '../interfaces/author.interface';
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
    authorCreateRequestDto: AuthorCreateRequestDto,
  ): Promise<IAuthor> {
    if (!currentUser.isAdmin) {
      throw new ForbiddenException("User don't have access this resource");
    }

    const author: IAuthor = await this.findByNameRepository.findByName(
      authorCreateRequestDto.name,
    );

    if (author) {
      throw new ConflictException('This author name already exists');
    }

    return await this.createRepository.create(authorCreateRequestDto);
  }
}
