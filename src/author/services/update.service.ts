import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthorUpdateRequestDto } from '../dto/requests/author.update.request.dto';
import { IAuthor } from '../interfaces/author.interface';
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
    authorId: string,
    authorUpdateRequestDto: AuthorUpdateRequestDto,
  ): Promise<IAuthor> {
    if (!currentUser.isAdmin) {
      throw new ForbiddenException("User don't have access this resource");
    }

    const author: IAuthor = await this.findByIdRepository.findById(authorId);

    if (!author) {
      throw new NotFoundException('Author not found');
    }

    if (author.name === authorUpdateRequestDto.name) {
      throw new ConflictException('This author name already exists');
    }

    return await this.updateRepository.update(authorId, authorUpdateRequestDto);
  }
}
