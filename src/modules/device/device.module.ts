import { Module } from '@nestjs/common';
import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Device } from './entities/device.entity';
import { Type } from '../type/entities/type.entity';
import { Brand } from '../brand/entities/brand.entity';
import { Rating } from '../rating/entities/rating.entity';
import { Basket } from '../basket/entities/basket.entity';
import { BasketDevice } from '../basket/entities/basket-device.entity';
import { DeviceInfo } from '../device-info/entities/device-info.entity';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Device,
      Type,
      Brand,
      Rating,
      Basket,
      BasketDevice,
      DeviceInfo,
    ]),
    FilesModule,
  ],
  controllers: [DeviceController],
  providers: [DeviceService],
})
export class DeviceModule {}
