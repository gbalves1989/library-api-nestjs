import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { USER } from '../models/user.model';
import { Model } from 'mongoose';
import { IUser } from '../interfaces/user.interface';

@Injectable()
export class FindByEmailWithOutPassRepository {
  constructor(@InjectModel(USER.name) private model: Model<IUser>) {}

  async findByEmailWithOutPass(email: string): Promise<IUser | null> {
    const user = await this.model.findOne({ email: email });

    if (!user) {
      return null;
    }

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      isAdmin: user.isAdmin,
    };
  }
}
