import { IsNotEmpty, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateBasketDto {
  @Transform(({ value }) => parseInt(value as string))
  @IsNotEmpty({ message: 'Поле deviceId обязательно!' })
  @IsNumber({}, { message: 'Поле deviceId должно быть числом' })
  deviceId: number;
}
