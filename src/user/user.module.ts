import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { USER } from './models/user.model';
import { UserSchema } from './schemas/user.schema';
import { CreateService } from './services/create.service';
import { FindAllService } from './services/findall.service';
import { FindByEmailService } from './services/findbyemail.service';
import { FindByEmailWithOutPassService } from './services/findbyemailwithoutpass.service';
import { UpdateService } from './services/update.service';
import { UploadAvatarService } from './services/uploadavatar.service';
import { DeleteService } from './services/delete.service';
import { CreateRepository } from './repositories/create.repository';
import { FindAllRepository } from './repositories/findall.repository';
import { FindByEmailRepository } from './repositories/findbyemail.repository';
import { FindByEmailWithOutPassRepository } from './repositories/findbyemailwithoutpass.repository';
import { UpdateRepository } from './repositories/update.repository';
import { UploadAvatarRepository } from './repositories/uploadavatar.repository';
import { DeleteRepository } from './repositories/delete.repository';
import { IndexController } from './controllers/index.controller';
import { UpdateController } from './controllers/update.controller';
import { UploadAvatarController } from './controllers/uploadavatar.controller';
import { DestroyController } from './controllers/destroy.controller';
import { UtilsModule } from '../utils/utils.module';

@Module({
  imports: [
    UtilsModule,
    MongooseModule.forFeatureAsync([
      {
        name: USER.name,
        useFactory: () => UserSchema,
      },
    ]),
  ],
  providers: [
    CreateService,
    FindAllService,
    FindByEmailService,
    FindByEmailWithOutPassService,
    UpdateService,
    UploadAvatarService,
    DeleteService,
    CreateRepository,
    FindAllRepository,
    FindByEmailRepository,
    FindByEmailWithOutPassRepository,
    UpdateRepository,
    UploadAvatarRepository,
    DeleteRepository,
  ],
  controllers: [
    IndexController,
    UpdateController,
    UploadAvatarController,
    DestroyController,
  ],
  exports: [FindByEmailService, CreateService, FindByEmailWithOutPassService],
})
export class UserModule {}
