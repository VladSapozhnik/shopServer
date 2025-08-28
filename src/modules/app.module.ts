import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../configurations';
import { SequelizeModule } from '@nestjs/sequelize';
import * as path from "path"

import { UserModule } from './user/user.module';
import { BasketModule } from './basket/basket.module';
import { RatingModule } from './rating/rating.module';
import { DeviceModule } from './device/device.module';
import { TypeModule } from './type/type.module';
import { BrandModule } from './brand/brand.module';
import { DeviceInfoModule } from './device-info/device-info.module';

import { User } from './user/entities/user.entity';
import { Type } from './type/entities/type.entity';
import { Rating } from './rating/entities/rating.entity';
import { DeviceInfo } from './device-info/entities/device-info.entity';
import { Device } from './device/entities/device.entity';
import { Brand } from './brand/entities/brand.entity';
import { BrandType } from './brand/entities/brand-type.entity';
import { Basket } from './basket/entities/basket.entity';
import { BasketDevice } from './basket/entities/basket-device.entity';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '..', 'static'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get('db_host'),
        port: +configService.get('db_port'),
        username: configService.get('db_username'),
        password: configService.get('db_password'),
        database: configService.get('db_name'),
        models: [
          User,
          Type,
          Rating,
          DeviceInfo,
          Device,
          Brand,
          BrandType,
          Basket,
          BasketDevice,
        ],
        autoLoadModels: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    BasketModule,
    RatingModule,
    DeviceModule,
    TypeModule,
    BrandModule,
    DeviceInfoModule,
    FilesModule,
  ],
})
export class AppModule {}
