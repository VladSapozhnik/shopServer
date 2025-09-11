import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { Rating, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RatingService {
  constructor(private readonly prismaService: PrismaService) {}
  async rateDevice(
    user: User,
    deviceId: number,
    createRatingDto: CreateRatingDto,
  ): Promise<Rating & { message: string }> {
    const rating = await this.prismaService.rating.upsert({
      where: { deviceId_userId: { userId: user.id, deviceId } },
      create: {
        userId: user.id,
        deviceId,
        score: createRatingDto.score,
        comment: createRatingDto.comment,
      },
      update: {
        score: createRatingDto.score,
        comment: createRatingDto.comment,
      },
    });

    return {
      message: 'Рейтинг успешно добавлен/обновлён',
      ...rating,
    };
  }

  async getAverageRating(deviceId: number) {
    const result = await this.prismaService.rating.aggregate({
      where: { deviceId },
      _avg: { score: true },
      _count: { score: true },
    });

    return {
      average: result._avg.score || 0,
      count: result._count.score || 0,
    };
  }

  async findOne(deviceId: number): Promise<Rating[]> {
    return this.prismaService.rating.findMany({
      where: { deviceId },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });
  }

  async remove(id: number): Promise<Rating & { message: string }> {
    const rating: Rating | null = await this.prismaService.rating.findUnique({
      where: { id },
    });

    if (!rating) {
      throw new NotFoundException('Рейтинга по такому id не существует');
    }

    const removeDevice: Rating = await this.prismaService.rating.delete({
      where: { id },
    });

    return {
      message: 'Комментарий удален',
      ...removeDevice,
    };
  }
}
