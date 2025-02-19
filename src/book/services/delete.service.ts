import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IAuth } from '../../auth/interfaces/auth.interface';
import * as fs from 'fs';
import { DeleteRepository } from '../repositories/delete.repository';
import { FindByIdRepository } from '../repositories/findbyid.repository';
import { IBook } from '../interfaces/book.interface';

@Injectable()
export class DeleteService {
  constructor(
    private readonly deleteRepository: DeleteRepository,
    private readonly findByIdRepository: FindByIdRepository,
  ) {}

  async delete(currentUser: IAuth, bookId: string): Promise<void> {
    if (!currentUser.isAdmin) {
      throw new ForbiddenException("User don't have access this resource");
    }

    const book: IBook = await this.findByIdRepository.findById(bookId);

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    if (book.banner) {
      fs.unlink(`./uploads/${book.banner}`, (err) => {
        if (err) {
          throw new NotFoundException('File not found');
        }
      });
    }

    await this.deleteRepository.delete(bookId);
  }
}
