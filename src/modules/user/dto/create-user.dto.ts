import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Поле имя должно быть строкой' })
  @IsNotEmpty({ message: 'Поле имя пустое' })
  @MaxLength(16, { message: 'Поле имя должно содержать меньше 16 символов' })
  name: string;
  @IsEmail({}, { message: 'Поле email некорректное' })
  @IsString({ message: 'Поле почта должно быть строкой' })
  @IsNotEmpty({ message: 'Поле почта пустое' })
  email: string;
  @IsString({ message: 'Поле пароль должно быть строкой' })
  @IsNotEmpty({ message: 'Поле пароль пустое' })
  @MaxLength(16, { message: 'Поле имя должно содержать меньше 16 символов' })
  @MinLength(6, { message: 'Поле имя должно содержать больше 6 символов' })
  password: string;
}
