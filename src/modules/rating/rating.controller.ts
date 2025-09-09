import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { Authorized } from '../../decorators/authorized.decorator';
import { Authorization } from '../../decorators/authorization.decorator';
import type { User } from '@prisma/client';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Authorization()
  @Post(':deviceId')
  rateDevice(
    @Authorized() user: User,
    @Param('deviceId', ParseIntPipe)
    deviceId: number,
    @Body() createRatingDto: CreateRatingDto,
  ) {
    return this.ratingService.rateDevice(user, deviceId, createRatingDto);
  }

  @Get(':deviceId')
  getAverageRating(@Param('deviceId', ParseIntPipe) deviceId: number) {
    return this.ratingService.getAverageRating(deviceId);
  }

  @Get(':deviceId/comments')
  findOne(@Param('id', ParseIntPipe) deviceId: number) {
    return this.ratingService.findOne(deviceId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ratingService.remove(+id);
  }
}
