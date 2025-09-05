import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { BasketService } from './basket.service';
import { CreateBasketDto } from './dto/create-basket.dto';
import { Authorization } from '../../decorators/authorization.decorator';
import { Authorized } from '../../decorators/authorized.decorator';
import type { User } from '@prisma/client';

@Controller('basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @Authorization()
  @Post('device')
  addDeviceToBasket(
    @Authorized() user: User,
    @Body() createBasketDto: CreateBasketDto,
  ) {
    return this.basketService.addDeviceToBasket(user, createBasketDto);
  }

  @Authorization()
  @Get('get-basket')
  getBasket(@Authorized() user: User) {
    return this.basketService.getBasket(user);
  }
  @Authorization()
  @Patch(':id')
  update(@Authorized() user: User, @Param('id', ParseIntPipe) id: number) {
    return this.basketService.removeOneDevice(user, +id);
  }

  @Authorization()
  @Delete(':id')
  removeDevice(
    @Authorized() user: User,
    @Param('id', ParseIntPipe) deviceId: number,
  ) {
    return this.basketService.removeDevice(user, deviceId);
  }
}
