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
import { Authorization } from '../../common/decorators/authorization.decorator';
import { Authorized } from '../../common/decorators/authorized.decorator';
import type { User } from '@prisma/client';
import { Message } from '../../common/decorators/message.decorator';
import { MessageInterceptor } from '../../common/interceptors/message.interceptor';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@UseInterceptors(MessageInterceptor)
@Controller('basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @ApiOperation({
    description: 'Добавить девайс в корзину по его id',
    summary: 'Добавить девайс в корзину',
  })
  @ApiCreatedResponse({
    description: 'Успешно добавили девайс в корзину',
    example: {
      message: 'Операция выполнена успешно!',
      data: {
        totalPrice: 125000,
        id: 1,
        userId: 1,
        user: {
          name: 'Mark',
          email: 'test@gmail.com',
          role: 'USER',
          rating: [],
        },
        devices: [
          {
            id: 8,
            quantity: 5,
            basketId: 1,
            deviceId: 1,
            device: {
              id: 1,
              name: 'Iphone 15 Pro Max',
              price: 25000,
              rating: 0,
              img: 'd794141f-77a6-40c6-9478-d8c65f1d55bc.jpg',
              typeId: 1,
              brandId: 1,
            },
          },
        ],
      },
    },
  })
  @ApiNotFoundResponse({ description: 'Корзина не найдена' })
  @ApiBadRequestResponse({
    description: 'Введены некорректные данные',
    example: {
      message: ['Поле deviceId должно быть числом'],
      error: 'Bad Request',
      statusCode: 400,
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Вы не авторизованные',
    example: {
      message: 'Unauthorized',
      statusCode: 401,
    },
  })
  @Authorization()
  @Post('device')
  addDeviceToBasket(
    @Authorized() user: User,
    @Body() createBasketDto: CreateBasketDto,
  ) {
    return this.basketService.addDeviceToBasket(user, createBasketDto);
  }

  @ApiOperation({
    description: 'Получить корзину пользователя',
    summary: 'Получить корзину',
  })
  @ApiOkResponse({
    description: 'Успешно полученная корзина',
    example: {
      message: 'Операция выполнена успешно!',
      data: {
        totalPrice: 150000,
        id: 1,
        userId: 1,
        user: {
          name: 'Vlad',
          email: 'vladbars2@gmail.com',
          role: 'USER',
          rating: [
            {
              id: 5,
              score: 5,
              comment: 'Мне понравился этот телефон',
              userId: 1,
              deviceId: 1,
            },
          ],
        },
        devices: [
          {
            id: 8,
            quantity: 6,
            basketId: 1,
            deviceId: 1,
            device: {
              id: 1,
              name: 'Iphone 15 Pro Max',
              price: 25000,
              rating: 0,
              img: 'd794141f-77a6-40c6-9478-d8c65f1d55bc.jpg',
              typeId: 1,
              brandId: 1,
            },
          },
        ],
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Вы не авторизованные',
    example: {
      message: 'Unauthorized',
      statusCode: 401,
    },
  })
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

  @ApiOperation({
    description: 'Уменьшить или удалить товар из корзины',
    summary: 'Уменьшить количество товара в корзине',
  })
  @ApiOkResponse({ description: 'Количество успешно уменьшено' })
  @ApiUnauthorizedResponse({
    description: 'Вы не авторизованные',
    example: {
      message: 'Unauthorized',
      statusCode: 401,
    },
  })
  @Authorization()
  @Delete('remove/:deviceId')
  removeDevice(
    @Authorized() user: User,
    @Param('deviceId', ParseIntPipe) deviceId: number,
  ) {
    return this.basketService.removeDevice(user, deviceId);
  }

  @ApiOperation({
    description: 'Очистить корзину полностью',
    summary: 'Очистить корзину',
  })
  @ApiOkResponse({ description: 'Корзина успешно очищенная' })
  @ApiUnauthorizedResponse({
    description: 'Вы не авторизованные',
    example: {
      message: 'Unauthorized',
      statusCode: 401,
    },
  })
  @Message('Корзина очищенная!')
  @Authorization()
  @Delete('clear')
  clearBasket(@Authorized() user: User) {
    return this.basketService.clearAndGetBasket(user);
  }
}
