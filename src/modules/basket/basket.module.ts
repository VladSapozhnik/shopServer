import { Module } from '@nestjs/common';
import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Basket } from './entities/basket.entity';
import { User } from '../user/entities/user.entity';
import { BasketDevice } from './entities/basket-device.entity';
import { Device } from '../device/entities/device.entity';

@Module({
  imports: [SequelizeModule.forFeature([Basket, User, BasketDevice, Device])],
  controllers: [BasketController],
  providers: [BasketService],
})
export class BasketModule {}
