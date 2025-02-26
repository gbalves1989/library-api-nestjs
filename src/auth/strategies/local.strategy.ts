import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UtilsService } from '../../utils/utils.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly utilsService: UtilsService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.utilsService.validateUser(username, password);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
