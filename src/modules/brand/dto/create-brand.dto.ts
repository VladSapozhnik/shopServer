import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBrandDto {
  @ApiProperty({
    description: 'Название бренда',
    example: 'Apple',
    type: 'string',
    required: true,
  })
  @IsString({ message: 'Поле имя должно быть строкой' })
  @IsNotEmpty({ message: 'Поле имя пустое' })
  @MaxLength(16, { message: 'Поле имя должно содержать меньше 16 символов' })
  name: string;
}
