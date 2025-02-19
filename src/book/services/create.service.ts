import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CreateRepository } from '../repositories/create.repository';
import { IAuth } from '../../auth/interfaces/auth.interface';
import { BookCreateRequestDto } from '../dto/requests/book.create.request.dto';
import { IBook } from '../interfaces/book.interface';
import { FindByNameRepository } from '../repositories/findbyname.repository';

@Injectable()
export class CreateService {
  constructor(
    private readonly createRepository: CreateRepository,
    private readonly findByNameRepository: FindByNameRepository,
  ) {}

  async create(
    currentUser: IAuth,
    bookCreateRequestDto: BookCreateRequestDto,
  ): Promise<IBook> {
    if (!currentUser.isAdmin) {
      throw new ForbiddenException("User don't have access this resource");
    }

    const book: IBook = await this.findByNameRepository.findByName(
      bookCreateRequestDto.name,
    );

    if (book) {
      throw new ConflictException('This book name already exists');
    }

    return await this.createRepository.create(bookCreateRequestDto);
  }
}
