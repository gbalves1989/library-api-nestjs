import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { USER } from '../models/user.model';
import { Model } from 'mongoose';
import { IUser } from '../interfaces/user.interface';

@Injectable()
export class UploadAvatarRepository {
  constructor(@InjectModel(USER.name) private model: Model<IUser>) {}

  async uploadAvatar(email: string, avatar: string): Promise<IUser> {
    const user = await this.model.findOne({ email: email });
    user.set('avatar', avatar);
    user.save();

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      isAdmin: user.isAdmin,
    };
  }
}
