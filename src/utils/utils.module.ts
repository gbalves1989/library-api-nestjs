import { forwardRef, Module } from '@nestjs/common';
import { UtilsService } from './utils.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [forwardRef(() => UserModule)],
  providers: [UtilsService],
  exports: [UtilsService],
})
export class UtilsModule {}
