import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Имя пользователя',
    example: 'Vlad',
    required: true,
    type: 'string',
  })
  @IsString({ message: 'Поле имя должно быть строкой' })
  @IsNotEmpty({ message: 'Поле имя пустое' })
  @MaxLength(16, { message: 'Поле имя должно содержать меньше 16 символов' })
  name: string;
  @ApiProperty({
    description: 'Поле для ввода ел.почты',
    example: 'test@gmail.com',
    required: true,
    type: 'string',
  })
  @IsEmail({}, { message: 'Поле email некорректное' })
  @IsString({ message: 'Поле почта должно быть строкой' })
  @IsNotEmpty({ message: 'Поле почта пустое' })
  email: string;
  @ApiProperty({
    description: 'Пароль пользователя!',
    example: 'test123',
    required: true,
    type: 'string',
    minLength: 6,
    maxLength: 128,
  })
  @IsString({ message: 'Поле пароль должно быть строкой' })
  @IsNotEmpty({ message: 'Поле пароль пустое' })
  @MaxLength(16, { message: 'Поле пароль должно содержать меньше 16 символов' })
  @MinLength(6, { message: 'Поле пароль должно содержать больше 6 символов' })
  password: string;
}
