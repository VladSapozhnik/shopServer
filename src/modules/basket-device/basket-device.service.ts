import { Injectable } from '@nestjs/common';
import { CreateBasketDeviceDto } from './dto/create-basket-device.dto';
import { UpdateBasketDeviceDto } from './dto/update-basket-device.dto';

@Injectable()
export class BasketDeviceService {
  create(createBasketDeviceDto: CreateBasketDeviceDto) {
    return 'This action adds a new basketDevice';
  }

  findAll() {
    return `This action returns all basketDevice`;
  }

  findOne(id: number) {
    return `This action returns a #${id} basketDevice`;
  }

  update(id: number, updateBasketDeviceDto: UpdateBasketDeviceDto) {
    return `This action updates a #${id} basketDevice`;
  }

  remove(id: number) {
    return `This action removes a #${id} basketDevice`;
  }
}
