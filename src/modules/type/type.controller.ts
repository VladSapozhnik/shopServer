import { Controller, Get, Post, Body, UseInterceptors } from '@nestjs/common';
import { TypeService } from './type.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { MessageInterceptor } from '../../common/interceptors/message.interceptor';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

@UseInterceptors(MessageInterceptor)
@Controller('type')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @ApiOperation({
    description: 'Возвращает объект девайса',
    summary: 'Создает тип для девайса',
  })
  @ApiCreatedResponse({
    description: 'Вы успешно создали тип устройства',
    example: {
      message: 'Операция выполнена успешно!',
      data: {
        id: 2,
        name: 'Телефоны',
      },
    },
  })
  @ApiConflictResponse({
    description: 'Такая тип уже создан',
    example: {
      message: 'Такая категория уже существует!',
      error: 'Conflict',
      statusCode: 409,
    },
  })
  @Post()
  create(@Body() createTypeDto: CreateTypeDto) {
    return this.typeService.create(createTypeDto);
  }

  @ApiOperation({
    description: 'Возвращает все девайсы',
    summary: 'Получить весь список девайсов',
  })
  @ApiOkResponse({
    description: 'Вы получили все девайсы',
    example: {
      message: 'Операция выполнена успешно!',
      data: [
        {
          id: 1,
          name: 'Телефоны',
        },
      ],
    },
  })
  @Get()
  findAll() {
    return this.typeService.findAll();
  }
}
