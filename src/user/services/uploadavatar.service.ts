import { Injectable, NotFoundException } from '@nestjs/common';
import { UploadAvatarRepository } from '../repositories/uploadavatar.repository';
import { IUser } from '../interfaces/user.interface';
import fs from 'fs';
import { FindByEmailWithOutPassRepository } from '../repositories/findbyemailwithoutpass.repository';
import { IAuth } from '../../auth/interfaces/auth.interface';

@Injectable()
export class UploadAvatarService {
  constructor(
    private readonly uploadAvatarRepository: UploadAvatarRepository,
    private readonly findByEmailWithOutPassRepository: FindByEmailWithOutPassRepository,
  ) {}

  async uploadAvatar(
    currentUser: IAuth,
    avatar: Express.Multer.File,
  ): Promise<IUser> {
    const user: IUser =
      await this.findByEmailWithOutPassRepository.findByEmailWithOutPass(
        currentUser.email,
      );

    if (user.avatar) {
      fs.unlink(`./uploads/${user.avatar}`, (err) => {
        if (err) {
          throw new NotFoundException('File not found');
        }
      });
    }

    return await this.uploadAvatarRepository.uploadAvatar(
      currentUser.email,
      avatar.filename,
    );
  }
}
