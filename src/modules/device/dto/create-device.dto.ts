import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateDeviceDto {
  @IsString({ message: 'Поле имя должно быть строкой' })
  @IsNotEmpty({ message: 'Поле имя пустое' })
  @MaxLength(16, { message: 'Поле имя должно содержать меньше 16 символов' })
  name: string;
  @IsNotEmpty({ message: 'Поле цены пустое' })
  @MaxLength(16, { message: 'Поле цены должно содержать меньше 16 символов' })
  price: number;
  @IsNotEmpty({ message: 'Поле brandID пустое' })
  @MaxLength(16, {
    message: 'Поле brandID должно содержать меньше 16 символов',
  })
  brandId: number;
  @IsNotEmpty({ message: 'Поле typeID пустое' })
  @MaxLength(16, {
    message: 'Поле typeID должно содержать меньше 16 символов',
  })
  typeId: number;
  @IsOptional()
  img: string;
}
