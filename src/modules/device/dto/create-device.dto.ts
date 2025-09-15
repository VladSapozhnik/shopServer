import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateDeviceDto {
  @ApiProperty({
    description: 'Название девайса',
    example: 'IPhone 15 Max Pro',
    type: 'string',
    required: true,
  })
  @IsString({ message: 'Поле имя должно быть строкой' })
  @IsNotEmpty({ message: 'Поле имя пустое' })
  name: string;
  @ApiProperty({
    description: 'Цена девайса',
    example: '12345678',
    type: 'number',
    required: true,
  })
  @Transform(({ value }) => parseInt(value as string))
  @IsNotEmpty({ message: 'Поле цены пустое' })
  @IsNumber({}, { message: 'Поле price не число' })
  price: number;
  @ApiProperty({
    description: 'Id бренда',
    example: '1',
    type: 'number',
    required: true,
  })
  @Transform(({ value }) => parseInt(value as string))
  @IsNotEmpty({ message: 'Поле brandID пустое' })
  @IsNumber({}, { message: 'Поле brainID не число' })
  brandId: number;
  @ApiProperty({
    description: 'Id типа',
    example: '2',
    type: 'number',
    required: true,
  })
  @Transform(({ value }) => parseInt(value as string))
  @IsNotEmpty({ message: 'Поле typeID пустое' })
  @IsNumber({}, { message: 'Поле typeID не число' })
  typeId: number;
  @ApiPropertyOptional({
    description: 'Загрузить картинку',
    example: 'name.jpg',
    type: 'string',
    required: false,
  })
  @IsOptional()
  @IsString()
  img?: string;
  @ApiPropertyOptional({
    description: 'Информация о девайсе',
    example: 'Топовый смартфон',
    type: 'string',
    required: false,
  })
  @IsOptional()
  @IsString()
  info?: string;
}
