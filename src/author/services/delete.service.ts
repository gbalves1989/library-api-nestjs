import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IAuthor } from '../interfaces/author.interface';
import * as fs from 'fs';
import { DeleteRepository } from '../repositories/delete.repository';
import { FindByIdRepository } from '../repositories/findbyid.repository';
import { IAuth } from '../../auth/interfaces/auth.interface';

@Injectable()
export class DeleteService {
  constructor(
    private readonly deleteRepository: DeleteRepository,
    private readonly findByIdRepository: FindByIdRepository,
  ) {}

  async delete(currentUser: IAuth, authorId: string): Promise<void> {
    if (!currentUser.isAdmin) {
      throw new ForbiddenException("User don't have access this resource");
    }

    const author: IAuthor = await this.findByIdRepository.findById(authorId);

    if (!author) {
      throw new NotFoundException('Author not found');
    }

    if (author.avatar) {
      fs.unlink(`./uploads/${author.avatar}`, (err) => {
        if (err) {
          throw new NotFoundException('File not found');
        }
      });
    }

    await this.deleteRepository.delete(authorId);
  }
}
