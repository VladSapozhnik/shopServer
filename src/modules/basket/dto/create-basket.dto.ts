import { IsNotEmpty } from 'class-validator';

export class CreateBasketDto {
  @IsNotEmpty({ message: 'Поле deviceId объязательное!' })
  deviceId: number;
}
