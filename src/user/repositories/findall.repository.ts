import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { USER } from '../models/user.model';
import { Model } from 'mongoose';
import { IUser } from '../interfaces/user.interface';

@Injectable()
export class FindAllRepository {
  constructor(@InjectModel(USER.name) private modelList: Model<IUser[]>) {}

  async findAll(): Promise<IUser[]> {
    return this.modelList.find();
  }
}
