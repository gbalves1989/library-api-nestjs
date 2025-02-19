import { Injectable, NotFoundException } from '@nestjs/common';
import { FindByIdRepository } from '../repositories/findbyid.repository';
import { IBook } from '../interfaces/book.interface';

@Injectable()
export class FindByIdService {
  constructor(private readonly findByIdRepository: FindByIdRepository) {}

  async findById(bookId: string): Promise<IBook> {
    const book: IBook = await this.findByIdRepository.findById(bookId);

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return book;
  }
}
