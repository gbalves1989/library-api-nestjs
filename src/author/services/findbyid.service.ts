import { Injectable, NotFoundException } from '@nestjs/common';
import { IAuthor } from '../interfaces/author.interface';
import { FindByIdRepository } from '../repositories/findbyid.repository';

@Injectable()
export class FindByIdService {
  constructor(private readonly findByIdRepository: FindByIdRepository) {}

  async findById(authorId: string): Promise<IAuthor> {
    const author: IAuthor = await this.findByIdRepository.findById(authorId);

    if (!author) {
      throw new NotFoundException('Author not found');
    }

    return author;
  }
}
