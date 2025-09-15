import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRatingDto {
  @ApiProperty({
    description: 'Рейтинг девайса от 1 до 5',
    example: '5',
    type: 'number',
    required: true,
  })
  @Transform(({ value }): number => parseInt(value as string))
  @Min(1, { message: 'Score должен быть минимум 1' })
  @Max(5, { message: 'Score не может быть больше 5' })
  @IsNotEmpty({ message: 'Score не должен быть пустым' })
  @IsNumber({}, { message: 'Score должен быть число' })
  score: number;
  @ApiPropertyOptional({
    description: 'Коментарий для девайса',
    example: 'Мне нравится этот девайс',
    type: 'string',
    required: false,
  })
  @IsString({ message: 'Поле комментария должно быть строкой!' })
  @IsOptional()
  comment?: string;
}
