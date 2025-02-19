import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { USER } from '../models/user.model';
import { Model } from 'mongoose';
import { IUser } from '../interfaces/user.interface';
import { UserUpdateRequestDto } from '../dto/requests/user.update.request.dto';

@Injectable()
export class UpdateRepository {
  constructor(@InjectModel(USER.name) private model: Model<IUser>) {}

  async update(
    email: string,
    userUpdateRequestDto: UserUpdateRequestDto,
  ): Promise<IUser> {
    const user = await this.model.findOne({ email: email });
    user.set('name', userUpdateRequestDto.name);
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
