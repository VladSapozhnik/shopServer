import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateDeviceDto {
  @IsString({ message: 'Поле имя должно быть строкой' })
  @IsNotEmpty({ message: 'Поле имя пустое' })
  @MaxLength(16, { message: 'Поле имя должно содержать меньше 16 символов' })
  name: string;
  @Transform(({ value }) => parseInt(value as string))
  @IsNotEmpty({ message: 'Поле цены пустое' })
  @IsNumber({}, { message: 'Поле price не число' })
  price: number;
  @Transform(({ value }) => parseInt(value as string))
  @IsNotEmpty({ message: 'Поле brandID пустое' })
  @IsNumber({}, { message: 'Поле brainID не число' })
  brandId: number;
  @Transform(({ value }) => parseInt(value as string))
  @IsNotEmpty({ message: 'Поле typeID пустое' })
  @IsNumber({}, { message: 'Поле typeID не число' })
  typeId: number;
  @IsOptional()
  @IsString()
  img?: string;
  @IsOptional()
  @IsString()
  info?: string;
}
