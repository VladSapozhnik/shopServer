import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  HttpStatus,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { MessageInterceptor } from '../../common/interceptors/message.interceptor';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
} from '@nestjs/swagger';
import { Message } from '../../common/decorators/message.decorator';

@ApiTags('Brand')
@UseInterceptors(MessageInterceptor)
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @ApiOperation({
    summary: 'Создать бренд',
    description: 'Возвращает созданый бренд',
  })
  @ApiCreatedResponse({
    description: 'Бренд создан',
    example: {
      message: 'Бренд успешно создан!',
      data: {
        id: 5,
        name: 'Xiaomi',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Не переданные поля в body',
    example: {
      message: ['Поле имя пустое'],
      error: 'Bad Request',
      statusCode: 400,
    },
  })
  @ApiConflictResponse({
    description: 'Такой бренд уже существует',
    example: {
      message: 'Такой бренд уже существует',
      error: 'Conflict',
      statusCode: 409,
    },
  })
  @Message('Бренд успешно создан!')
  @Post()
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandService.create(createBrandDto);
  }

  @ApiOperation({
    summary: 'Получить все бренды',
    description: 'Возвращает список всех брендов',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Бренды найдены',
    type: [CreateBrandDto],
  })
  @Get()
  findAll() {
    return this.brandService.findAll();
  }
}
