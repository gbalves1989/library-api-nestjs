import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DeleteRepository } from '../repositories/delete.repository';
import { IUser } from '../interfaces/user.interface';
import * as fs from 'fs';
import { FindByEmailWithOutPassRepository } from '../repositories/findbyemailwithoutpass.repository';
import { IAuth } from '../../auth/interfaces/auth.interface';

@Injectable()
export class DeleteService {
  constructor(
    private readonly deleteRepository: DeleteRepository,
    private readonly findByEmailWithOutPassRepository: FindByEmailWithOutPassRepository,
  ) {}

  async delete(currentUser: IAuth, emailClient: string): Promise<void> {
    const user: IUser =
      await this.findByEmailWithOutPassRepository.findByEmailWithOutPass(
        currentUser.email,
      );

    const userClient: IUser =
      await this.findByEmailWithOutPassRepository.findByEmailWithOutPass(
        emailClient,
      );

    if (!user.isAdmin) {
      throw new ForbiddenException(
        "User don't have permission to access this resource",
      );
    }

    if (userClient.avatar) {
      fs.unlink(`./uploads/${userClient.avatar}`, (err) => {
        if (err) {
          throw new NotFoundException('File not found');
        }
      });
    }

    await this.deleteRepository.delete(emailClient);
  }
}
