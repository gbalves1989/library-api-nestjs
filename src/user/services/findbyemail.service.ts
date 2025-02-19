import { Injectable } from '@nestjs/common';
import { FindByEmailRepository } from '../repositories/findbyemail.repository';
import { IUserWithPass } from '../interfaces/user.interface';

@Injectable()
export class FindByEmailService {
  constructor(private readonly findByEmailRepository: FindByEmailRepository) {}

  async findByEmail(email: string): Promise<IUserWithPass> {
    return await this.findByEmailRepository.findByEmail(email);
  }
}
