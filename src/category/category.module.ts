import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { StoreController } from './controllers/store.controller';
import { IndexController } from './controllers/index.controller';
import { ShowController } from './controllers/show.controller';
import { UpdateController } from './controllers/update.controller';
import { DestroyController } from './controllers/destroy.controller';
import { CreateService } from './services/create.service';
import { FindAllService } from './services/findall.service';
import { FindByIdService } from './services/findbyid.service';
import { UpdateService } from './services/update.service';
import { DeleteService } from './services/delete.service';
import { CreateRepository } from './repositories/create.repository';
import { FindAllRepository } from './repositories/findall.repository';
import { FindByIdRepository } from './repositories/findbyid.repository';
import { UpdateRepository } from './repositories/update.repository';
import { DeleteRepository } from './repositories/delete.repository';
import { FindByNameRepository } from './repositories/findbyname.repository';

@Module({
  imports: [DatabaseModule],
  providers: [
    CreateService,
    FindAllService,
    FindByIdService,
    UpdateService,
    DeleteService,
    CreateRepository,
    FindAllRepository,
    FindByIdRepository,
    FindByNameRepository,
    UpdateRepository,
    DeleteRepository,
  ],
  controllers: [
    StoreController,
    IndexController,
    ShowController,
    UpdateController,
    DestroyController,
  ],
})
export class CategoryModule {}
