import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DeviceInfoService } from './device-info.service';
import { CreateDeviceInfoDto } from './dto/create-device-info.dto';
import { UpdateDeviceInfoDto } from './dto/update-device-info.dto';

@Controller('device-info')
export class DeviceInfoController {
  constructor(private readonly deviceInfoService: DeviceInfoService) {}

  @Post()
  create(@Body() createDeviceInfoDto: CreateDeviceInfoDto) {
    return this.deviceInfoService.create(createDeviceInfoDto);
  }

  @Get()
  findAll() {
    return this.deviceInfoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deviceInfoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeviceInfoDto: UpdateDeviceInfoDto) {
    return this.deviceInfoService.update(+id, updateDeviceInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deviceInfoService.remove(+id);
  }
}
