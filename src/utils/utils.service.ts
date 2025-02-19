import { Injectable } from '@nestjs/common';
import { IUserWithPass } from '../user/interfaces/user.interface';
import { FindByEmailService } from '../user/services/findbyemail.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UtilsService {
  constructor(private readonly findByEmailService: FindByEmailService) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<IUserWithPass | null> {
    const user: IUserWithPass =
      await this.findByEmailService.findByEmail(email);
    const isValidPassword: boolean = await this.checkPassword(
      password,
      user.password,
    );

    if (user && isValidPassword) return user;

    return null;
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async checkPassword(password: string, passwordDB: string): Promise<boolean> {
    return await bcrypt.compare(password, passwordDB);
  }
}
