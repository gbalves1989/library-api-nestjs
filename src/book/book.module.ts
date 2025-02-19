import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CreateRepository } from './repositories/create.repository';
import { FindAllRepository } from './repositories/findall.repository';
import { FindByIdRepository } from './repositories/findbyid.repository';
import { UpdateRepository } from './repositories/update.repository';
import { UploadBannerRepository } from './repositories/uploadbanner.repository';
import { DeleteRepository } from './repositories/delete.repository';
import { FindByNameRepository } from './repositories/findbyname.repository';
import { CreateService } from './services/create.service';
import { FindAllService } from './services/findall.service';
import { FindByIdService } from './services/findbyid.service';
import { UpdateService } from './services/update.service';
import { UploadBannerService } from './services/uploadbanner.service';
import { DeleteService } from './services/delete.service';
import { StoreController } from './controllers/store.controller';
import { IndexController } from './controllers/index.controller';
import { ShowController } from './controllers/show.controller';
import { UpdateController } from './controllers/update.controller';
import { UploadBannerController } from './controllers/uploadbanner.controller';
import { DestroyController } from './controllers/destroy.controller';

@Module({
  imports: [DatabaseModule],
  providers: [
    CreateService,
    FindAllService,
    FindByIdService,
    UpdateService,
    UploadBannerService,
    DeleteService,
    CreateRepository,
    FindAllRepository,
    FindByIdRepository,
    FindByNameRepository,
    UpdateRepository,
    UploadBannerRepository,
    DeleteRepository,
  ],
  controllers: [
    StoreController,
    IndexController,
    ShowController,
    UpdateController,
    UploadBannerController,
    DestroyController,
  ],
  exports: [FindByIdService],
})
export class BookModule {}
