import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { Basket } from '../basket/entities/basket.entity';
import { Rating } from '../rating/entities/rating.entity';

@Module({
  imports: [SequelizeModule.forFeature([User, Basket, Rating])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
