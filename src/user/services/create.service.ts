import { ConflictException, Injectable } from '@nestjs/common';
import { CreateRepository } from '../repositories/create.repository';
import { UserCreateRequestDTO } from '../dto/requests/user.create.request.dto';
import { IUser } from '../interfaces/user.interface';
import { FindByEmailWithOutPassRepository } from '../repositories/findbyemailwithoutpass.repository';
import { UtilsService } from '../../utils/utils.service';

@Injectable()
export class CreateService {
  constructor(
    private readonly createRepository: CreateRepository,
    private readonly findByEmailWithOutPassRepository: FindByEmailWithOutPassRepository,
    private readonly utilsService: UtilsService,
  ) {}

  async create(userCreateRequestDto: UserCreateRequestDTO): Promise<IUser> {
    const user: IUser | null =
      await this.findByEmailWithOutPassRepository.findByEmailWithOutPass(
        userCreateRequestDto.email,
      );

    if (user) {
      throw new ConflictException('This e-mail already to created');
    }

    const hash: string = await this.utilsService.hashPassword(
      userCreateRequestDto.password,
    );

    return await this.createRepository.create(userCreateRequestDto, hash);
  }
}
