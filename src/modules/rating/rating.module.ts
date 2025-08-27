import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Rating } from './entities/rating.entity';
import { User } from '../user/entities/user.entity';
import { Device } from '../device/entities/device.entity';

@Module({
  imports: [SequelizeModule.forFeature([Rating, User, Device])],
  controllers: [RatingController],
  providers: [RatingService],
})
export class RatingModule {}
