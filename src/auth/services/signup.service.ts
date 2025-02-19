import { Injectable } from '@nestjs/common';
import { IUser } from '../../user/interfaces/user.interface';
import { UserCreateRequestDTO } from '../../user/dto/requests/user.create.request.dto';
import { CreateService } from '../../user/services/create.service';

@Injectable()
export class SignUpService {
  constructor(private readonly createService: CreateService) {}

  async signUp(userCreateRequestDTO: UserCreateRequestDTO): Promise<IUser> {
    return this.createService.create(userCreateRequestDTO);
  }
}
