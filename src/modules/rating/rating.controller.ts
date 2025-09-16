import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { Authorized } from '../../common/decorators/authorized.decorator';
import { Authorization } from '../../common/decorators/authorization.decorator';
import type { User } from '@prisma/client';
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
@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @ApiOperation({
    description: 'Создает комментарий или изменяет и рейтинг от 1 до 5',
    summary: 'Создать комментрарий и ставит рейтинг',
  })
  @ApiCreatedResponse({
    description: 'Вы успешно создали или изменили рейтинг и комментарий',
    example: {
      message: 'Рейтинг успешно добавлен/обновлён',
      id: 3,
      score: 5,
      comment: 'Мне понравился этот телефон',
      userId: 1,
      deviceId: 1,
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Вы не авторизованные',
    example: {
      message: 'Unauthorized',
      statusCode: 401,
    },
  })
  @ApiBadRequestResponse({
    description: 'Не правильно ввели данные',
    example: {
      message: ['Score должен быть минимум 1'],
      error: 'Bad Request',
      statusCode: 400,
    },
  })
  @Authorization()
  @Post(':deviceId')
  rateDevice(
    @Authorized() user: User,
    @Param('deviceId', ParseIntPipe)
    deviceId: number,
    @Body() createRatingDto: CreateRatingDto,
  ) {
    return this.ratingService.rateDevice(user, deviceId, createRatingDto);
  }

  @ApiOperation({
    description: 'Получить средний рейтинг девайса и их количество',
    summary: 'Получить средний рейтинг девайса',
  })
  @ApiOkResponse({
    description: 'Вы успешно получили средний рейтинг товара',
    example: {
      message: 'Операция выполнена успешно!',
      data: {
        average: 5,
        count: 3,
      },
    },
  })
  @Get(':deviceId')
  getAverageRating(@Param('deviceId', ParseIntPipe) deviceId: number) {
    return this.ratingService.getAverageRating(deviceId);
  }

  @ApiOperation({
    description: 'Получает все отзывы определенного девайса',
    summary: 'Получить все отзывы девайса',
  })
  @ApiOkResponse({
    description: 'Успешно полученные отзывы',
    example: {
      message: 'Операция выполнена успешно!',
      data: [
        {
          id: 5,
          score: 5,
          comment: 'Мне понравился этот телефон',
          userId: 1,
          deviceId: 1,
          user: {
            name: 'Lena',
            email: 'test@gmail.com',
            role: 'USER',
          },
        },
      ],
    },
  })
  @Get(':deviceId/comments')
  findOne(@Param('deviceId', ParseIntPipe) deviceId: number) {
    return this.ratingService.findOne(deviceId);
  }

  @ApiOperation({
    description: 'Удалить существующий комментарий',
    summary: 'удалить комментарий',
  })
  @ApiOkResponse({
    description: 'Вы успещно удалили комментарий',
    example: {
      message: 'Комментарий удален',
      id: 3,
      score: 5,
      comment: 'Мне понравился этот телефон',
      userId: 1,
      deviceId: 1,
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Вы не авторизованные',
    example: {
      message: 'Unauthorized',
      statusCode: 401,
    },
  })
  @ApiNotFoundResponse({
    description: 'Такого комментария не существует',
    example: {
      message: 'Рейтинга по такому id не существует',
      error: 'Not Found',
      statusCode: 404,
    },
  })
  @Delete(':ratingId')
  remove(@Param('ratingId', ParseIntPipe) ratingId: number) {
    return this.ratingService.remove(ratingId);
  }
}
