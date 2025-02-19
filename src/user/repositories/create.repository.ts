import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { USER } from '../models/user.model';
import { Model } from 'mongoose';
import { IUser } from '../interfaces/user.interface';
import { UserCreateRequestDTO } from '../dto/requests/user.create.request.dto';

@Injectable()
export class CreateRepository {
  constructor(@InjectModel(USER.name) private model: Model<IUser>) {}

  async create(
    userCreateRequestDto: UserCreateRequestDTO,
    hash: string,
  ): Promise<IUser> {
    const user = new this.model({
      ...userCreateRequestDto,
      password: hash,
    });
    await user.save();

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      isAdmin: user.isAdmin,
    };
  }
}
