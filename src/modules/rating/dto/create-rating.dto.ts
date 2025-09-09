import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateRatingDto {
  @Transform(({ value }): number => parseInt(value as string))
  @Min(1, { message: 'Score должен быть минимум 1' })
  @Max(5, { message: 'Score не может быть больше 5' })
  @IsNotEmpty({ message: 'Score не должен быть пустым' })
  @IsNumber({}, { message: 'Score должен быть число' })
  score: number;
  @IsString({ message: 'Поле комментария должно быть строкой!' })
  @IsOptional()
  comment?: string;
}
