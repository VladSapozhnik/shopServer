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
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';

@UseInterceptors(MessageInterceptor)
@Controller('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @ApiOperation({ description: 'Создает девайс', summary: 'Создать девайс' })
  @ApiCreatedResponse({
    description: 'Вы успешно создали девайс',
    example: {
      message: 'Операция выполнена успешно!',
      data: {
        id: 2,
        name: 'Iphone 16 Pro Max',
        price: 25000,
        rating: 0,
        img: 'cf160f74-9c71-431a-b26d-448f682f8060.jpg',
        typeId: 1,
        brandId: 1,
        deviceInfos: [],
      },
    },
  })
  @ApiConflictResponse({
    description: 'Такой девайс уже существует!',
    example: {
      message: 'Device с таким названием уже существует',
      error: 'Conflict',
      statusCode: 409,
    },
  })
  @ApiBadRequestResponse({
    description: 'Ввели некорректные данные!',
    example: {
      message: ['Поле имя пустое'],
      error: 'Bad Request',
      statusCode: 400,
    },
  })
  @Post()
  @UseInterceptors(FileInterceptor('img'))
  create(
    @Body() createDeviceDto: CreateDeviceDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.deviceService.create(createDeviceDto, image);
  }

  @ApiOperation({
    description:
      'Получить все девайсы или получить те которые нужны по фильтру',
    summary: 'Получить девайсы',
  })
  @ApiOkResponse({
    description: 'Все девайсы удачно полученны',
    example: {
      message: 'Операция выполнена успешно!',
      data: {
        count: 2,
        rows: [
          {
            id: 1,
            name: 'Iphone 15 Pro Max',
            price: 25000,
            rating: 0,
            img: 'd794141f-77a6-40c6-9478-d8c65f1d55bc.jpg',
            typeId: 1,
            brandId: 1,
            ratings: [
              {
                id: 5,
                score: 5,
                comment: 'Мне понравился этот телефон',
                userId: 1,
                deviceId: 1,
              },
            ],
            deviceInfos: [],
          },
          {
            id: 2,
            name: 'Iphone 16 Pro Max',
            price: 25000,
            rating: 0,
            img: 'cf160f74-9c71-431a-b26d-448f682f8060.jpg',
            typeId: 1,
            brandId: 1,
            ratings: [],
            deviceInfos: [],
          },
        ],
      },
    },
  })
  @ApiQuery({ name: 'brandId', required: false, type: 'number' })
  @ApiQuery({ name: 'typeId', required: false, type: 'number' })
  @ApiQuery({ name: 'page', required: false, type: 'number' })
  @ApiQuery({ name: 'limit', required: false, type: 'number' })
  @Get('all')
  findAll(
    @Query('brandId') brandId: number,
    @Query('typeId') typeId: number,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.deviceService.findAll(brandId, typeId, page, limit);
  }

  @ApiOperation({
    description: 'Получить девайс по id',
    summary: 'Получить определенный левайс',
  })
  @ApiOkResponse({
    description: 'Получили девайс по id',
    example: {
      message: 'Операция выполнена успешно!',
      data: {
        id: 1,
        name: 'Iphone 15 Pro Max',
        price: 25000,
        rating: 0,
        img: 'd794141f-77a6-40c6-9478-d8c65f1d55bc.jpg',
        typeId: 1,
        brandId: 1,
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Такой девайс не найден, возможно его не существует',
    example: {
      message: 'Такой девайс не найден!',
      error: 'Not Found',
      statusCode: 404,
    },
  })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.deviceService.findOne(id);
  }
}
