import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { Authorized } from '../../common/decorators/authorized.decorator';
import { Authorization } from '../../common/decorators/authorization.decorator';
import type { User } from '@prisma/client';
import { MessageInterceptor } from '../../common/interceptors/message.interceptor';

@UseInterceptors(MessageInterceptor)
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
  findOne(@Param('deviceId', ParseIntPipe) deviceId: number) {
    return this.ratingService.findOne(deviceId);
  }

  @Delete(':ratingId')
  remove(@Param('ratingId', ParseIntPipe) ratingId: number) {
    return this.ratingService.remove(ratingId);
  }
}
