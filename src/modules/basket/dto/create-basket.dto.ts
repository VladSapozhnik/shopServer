import { IsNotEmpty, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBasketDto {
  @ApiProperty({
    description: 'вставить id device по которому добавляется в корзину',
    example: '123',
    required: true,
    type: 'number',
  })
  @Transform(({ value }) => parseInt(value as string))
  @IsNotEmpty({ message: 'Поле deviceId обязательно!' })
  @IsNumber({}, { message: 'Поле deviceId должно быть числом' })
  deviceId: number;
}
