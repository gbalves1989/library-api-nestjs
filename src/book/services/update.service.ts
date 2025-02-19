import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IAuth } from '../../auth/interfaces/auth.interface';
import { UpdateRepository } from '../repositories/update.repository';
import { FindByIdRepository } from '../repositories/findbyid.repository';
import { BookUpdateRequestDto } from '../dto/requests/book.update.request.dto';
import { IBook } from '../interfaces/book.interface';

@Injectable()
export class UpdateService {
  constructor(
    private readonly updateRepository: UpdateRepository,
    private readonly findByIdRepository: FindByIdRepository,
  ) {}

  async update(
    currentUser: IAuth,
    bookId: string,
    bookUpdateRequestDto: BookUpdateRequestDto,
  ): Promise<IBook> {
    if (!currentUser.isAdmin) {
      throw new ForbiddenException("User don't have access this resource");
    }

    const book: IBook = await this.findByIdRepository.findById(bookId);

    if (!book) {
      throw new NotFoundException('Author not found');
    }

    if (book.name === bookUpdateRequestDto.name) {
      throw new ConflictException('This author name already exists');
    }

    return await this.updateRepository.update(bookId, bookUpdateRequestDto);
  }
}
