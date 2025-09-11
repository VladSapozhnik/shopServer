import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Patch,
  UseInterceptors,
} from '@nestjs/common';
import { BasketService } from './basket.service';
import { CreateBasketDto } from './dto/create-basket.dto';
import { Authorization } from '../../decorators/authorization.decorator';
import { Authorized } from '../../decorators/authorized.decorator';
import type { User } from '@prisma/client';
import { Message } from '../../decorators/message.decorator';
import { MessageInterceptor } from '../../interceptors/message.interceptor';

@UseInterceptors(MessageInterceptor)
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
  @Patch(':deviceId')
  update(
    @Authorized() user: User,
    @Param('deviceId', ParseIntPipe) deviceId: number,
  ) {
    return this.basketService.removeOneDevice(user, deviceId);
  }

  @Authorization()
  @Delete('remove/:deviceId')
  removeDevice(
    @Authorized() user: User,
    @Param('deviceId', ParseIntPipe) deviceId: number,
  ) {
    return this.basketService.removeDevice(user, deviceId);
  }

  @Message('Корзина очищенная!')
  @Authorization()
  @Delete('clear')
  clearBasket(@Authorized() user: User) {
    return this.basketService.clearAndGetBasket(user);
  }
}
