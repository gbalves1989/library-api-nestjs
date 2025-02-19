import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { USER } from '../models/user.model';
import { Model } from 'mongoose';
import { IUser } from '../interfaces/user.interface';

@Injectable()
export class DeleteRepository {
  constructor(@InjectModel(USER.name) private model: Model<IUser>) {}

  async delete(email: string): Promise<void> {
    await this.model.deleteOne({ email: email });
  }
}
