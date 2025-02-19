import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUserToken } from '../../user/interfaces/user.interface';

@Injectable()
export class SignInService {
  constructor(private readonly jwtService: JwtService) {}

  async signIn(user: any): Promise<IUserToken> {
    const payload = {
      sub: user._id,
      username: user.email,
      isAdmin: user.isAdmin,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
