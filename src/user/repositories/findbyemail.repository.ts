import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { USER } from '../models/user.model';
import { Model } from 'mongoose';
import { IUserWithPass } from '../interfaces/user.interface';

@Injectable()
export class FindByEmailRepository {
  constructor(
    @InjectModel(USER.name) private modelWithPass: Model<IUserWithPass>,
  ) {}

  async findByEmail(email: string): Promise<IUserWithPass> {
    const user = await this.modelWithPass.findOne({ email: email });

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
      avatar: user.avatar,
      isAdmin: user.isAdmin,
    };
  }
}
