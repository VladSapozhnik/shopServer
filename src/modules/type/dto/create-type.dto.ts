import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateTypeDto {
  @IsString({ message: 'Поле имя должно быть строкой' })
  @IsNotEmpty({ message: 'Поле имя пустое' })
  @MaxLength(16, { message: 'Поле имя должно содержать меньше 16 символов' })
  name: string;
}
