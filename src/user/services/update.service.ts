import { Injectable } from '@nestjs/common';
import { UpdateRepository } from '../repositories/update.repository';
import { UserUpdateRequestDto } from '../dto/requests/user.update.request.dto';
import { IUser } from '../interfaces/user.interface';
import { IAuth } from '../../auth/interfaces/auth.interface';

@Injectable()
export class UpdateService {
  constructor(private readonly updateRepository: UpdateRepository) {}

  async update(
    currentUser: IAuth,
    userUpdateRequestDto: UserUpdateRequestDto,
  ): Promise<IUser> {
    return await this.updateRepository.update(
      currentUser.email,
      userUpdateRequestDto,
    );
  }
}
