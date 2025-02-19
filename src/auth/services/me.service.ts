import { Injectable } from '@nestjs/common';
import { FindByEmailWithOutPassService } from '../../user/services/findbyemailwithoutpass.service';
import { IUser } from '../../user/interfaces/user.interface';
import { IAuth } from '../interfaces/auth.interface';

@Injectable()
export class MeService {
  constructor(
    private readonly findByEmailWithOutPass: FindByEmailWithOutPassService,
  ) {}

  async me(currentUser: IAuth): Promise<IUser> {
    return await this.findByEmailWithOutPass.findByEmailWithOutPass(
      currentUser.email,
    );
  }
}
