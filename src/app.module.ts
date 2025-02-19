import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from './category/category.module';
import { AuthorModule } from './author/author.module';
import { UtilsModule } from './utils/utils.module';
import { BookModule } from './book/book.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_DATABASE_URL),
    CategoryModule,
    AuthorModule,
    UtilsModule,
    BookModule,
  ],
})
export class AppModule {}
