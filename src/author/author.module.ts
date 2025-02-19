import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CreateService } from './services/create.service';
import { FindAllService } from './services/findall.service';
import { FindByIdService } from './services/findbyid.service';
import { UpdateService } from './services/update.service';
import { UploadAvatarService } from './services/uploadavatar.service';
import { DeleteService } from './services/delete.service';
import { CreateRepository } from './repositories/create.repository';
import { FindAllRepository } from './repositories/findall.repository';
import { FindByIdRepository } from './repositories/findbyid.repository';
import { FindByNameRepository } from './repositories/findbyname.repository';
import { UpdateRepository } from './repositories/update.repository';
import { UploadAvatarRepository } from './repositories/uploadavatar.repository';
import { DeleteRepository } from './repositories/delete.repository';
import { StoreController } from './controllers/store.controller';
import { IndexController } from './controllers/index.controller';
import { ShowController } from './controllers/show.controller';
import { UpdateController } from './controllers/update.controller';
import { UploadAvatarController } from './controllers/uploadavatar.controller';
import { DestroyController } from './controllers/destroy.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [
    StoreController,
    IndexController,
    ShowController,
    UpdateController,
    UploadAvatarController,
    DestroyController,
  ],
  providers: [
    CreateService,
    FindAllService,
    FindByIdService,
    UpdateService,
    UploadAvatarService,
    DeleteService,
    CreateRepository,
    FindAllRepository,
    FindByIdRepository,
    FindByNameRepository,
    UpdateRepository,
    UploadAvatarRepository,
    DeleteRepository,
  ],
  exports: [FindByIdService],
})
export class AuthorModule {}
