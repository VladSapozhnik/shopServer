import { Module } from '@nestjs/common';
import { DeviceInfoService } from './device-info.service';
import { DeviceInfoController } from './device-info.controller';

@Module({
  controllers: [DeviceInfoController],
  providers: [DeviceInfoService],
})
export class DeviceInfoModule {}
