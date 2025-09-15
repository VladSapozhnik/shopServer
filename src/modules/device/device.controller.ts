import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { DeviceService } from './device.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MessageInterceptor } from '../../common/interceptors/message.interceptor';

@UseInterceptors(MessageInterceptor)
@Controller('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Post()
  @UseInterceptors(FileInterceptor('img'))
  create(
    @Body() createDeviceDto: CreateDeviceDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.deviceService.create(createDeviceDto, image);
  }

  @Get()
  findAll(
    @Query('brandId') brandId: number,
    @Query('typeId') typeId: number,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.deviceService.findAll(brandId, typeId, page, limit);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.deviceService.findOne(id);
  }
}
