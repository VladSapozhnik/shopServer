import { Module } from '@nestjs/common';
import { BasketDeviceService } from './basket-device.service';
import { BasketDeviceController } from './basket-device.controller';

@Module({
  controllers: [BasketDeviceController],
  providers: [BasketDeviceService],
})
export class BasketDeviceModule {}
