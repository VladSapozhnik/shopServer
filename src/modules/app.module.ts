import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../configurations';
import { SequelizeModule } from '@nestjs/sequelize';

import { UserModule } from './user/user.module';
import { BasketModule } from './basket/basket.module';
import { DeviceModule } from './device/device.module';
import { RatingModule } from './rating/rating.module';
import { BrandModule } from './brand/brand.module';
import { TypeModule } from './type/type.module';
import { DeviceInfoModule } from './device-info/device-info.module';
import { BasketDeviceModule } from './basket-device/basket-device.module';

@Module({
  imports: [
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
        autoLoadModels: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    BasketModule,
    DeviceModule,
    RatingModule,
    BrandModule,
    TypeModule,
    DeviceInfoModule,
    BasketDeviceModule,
  ],
})
export class AppModule {}
