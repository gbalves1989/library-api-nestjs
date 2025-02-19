import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { MeController } from './controllers/me.controller';
import { SignUpController } from './controllers/signup.controller';
import { SignInController } from './controllers/signin.controller';
import { SignInService } from './services/signin.service';
import { SignUpService } from './services/signup.service';
import { UtilsModule } from '../utils/utils.module';
import { MeService } from './services/me.service';

@Module({
  imports: [
    UserModule,
    PassportModule,
    UtilsModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
        signOptions: {
          expiresIn: config.get('EXPIRES_IN'),
          audience: config.get('APP_URL'),
        },
      }),
    }),
  ],
  controllers: [SignInController, SignUpController, MeController],
  providers: [
    SignInService,
    SignUpService,
    MeService,
    LocalStrategy,
    JwtStrategy,
  ],
})
export class AuthModule {}
