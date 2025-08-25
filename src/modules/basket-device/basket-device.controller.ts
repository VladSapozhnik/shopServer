import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BasketDeviceService } from './basket-device.service';
import { CreateBasketDeviceDto } from './dto/create-basket-device.dto';
import { UpdateBasketDeviceDto } from './dto/update-basket-device.dto';

@Controller('basket-device')
export class BasketDeviceController {
  constructor(private readonly basketDeviceService: BasketDeviceService) {}

  @Post()
  create(@Body() createBasketDeviceDto: CreateBasketDeviceDto) {
    return this.basketDeviceService.create(createBasketDeviceDto);
  }

  @Get()
  findAll() {
    return this.basketDeviceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.basketDeviceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBasketDeviceDto: UpdateBasketDeviceDto) {
    return this.basketDeviceService.update(+id, updateBasketDeviceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.basketDeviceService.remove(+id);
  }
}
