import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from '../configurations';
import * as path from 'path';

import { UserModule } from './user/user.module';
import { BasketModule } from './basket/basket.module';
import { RatingModule } from './rating/rating.module';
import { DeviceModule } from './device/device.module';
import { TypeModule } from './type/type.module';
import { BrandModule } from './brand/brand.module';

import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TokenModule } from './token/token.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '..', 'static'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    UserModule,
    BasketModule,
    RatingModule,
    DeviceModule,
    TypeModule,
    BrandModule,
    FilesModule,
    TokenModule,
    PrismaModule,
  ],
})
export class AppModule {}
