import { Module } from '@nestjs/common';
import { DeviceInfoService } from './device-info.service';
import { DeviceInfoController } from './device-info.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { DeviceInfo } from './entities/device-info.entity';
import { Device } from '../device/entities/device.entity';

@Module({
  imports: [SequelizeModule.forFeature([DeviceInfo, Device])],
  controllers: [DeviceInfoController],
  providers: [DeviceInfoService],
})
export class DeviceInfoModule {}
