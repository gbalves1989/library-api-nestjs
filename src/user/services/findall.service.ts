import { ForbiddenException, Injectable } from '@nestjs/common';
import { FindAllRepository } from '../repositories/findall.repository';
import { IUser } from '../interfaces/user.interface';
import { FindByEmailWithOutPassRepository } from '../repositories/findbyemailwithoutpass.repository';
import { IAuth } from '../../auth/interfaces/auth.interface';

@Injectable()
export class FindAllService {
  constructor(
    private readonly findAllRepository: FindAllRepository,
    private readonly findByEmailWithOutPassRepository: FindByEmailWithOutPassRepository,
  ) {}

  async findAll(currentUser: IAuth): Promise<IUser[]> {
    const user: IUser =
      await this.findByEmailWithOutPassRepository.findByEmailWithOutPass(
        currentUser.email,
      );

    if (!user.isAdmin) {
      throw new ForbiddenException(
        "User don't have permission to access this resource",
      );
    }

    return await this.findAllRepository.findAll();
  }
}
