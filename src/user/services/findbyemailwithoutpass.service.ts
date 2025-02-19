import { Injectable, NotFoundException } from '@nestjs/common';
import { FindByEmailWithOutPassRepository } from '../repositories/findbyemailwithoutpass.repository';
import { IUser } from '../interfaces/user.interface';

@Injectable()
export class FindByEmailWithOutPassService {
  constructor(
    private readonly findByEmailWithOutPassRepository: FindByEmailWithOutPassRepository,
  ) {}

  async findByEmailWithOutPass(email: string): Promise<IUser> {
    const user: IUser =
      await this.findByEmailWithOutPassRepository.findByEmailWithOutPass(email);

    if (!user) {
      throw new NotFoundException('E-mail not found');
    }

    return user;
  }
}
