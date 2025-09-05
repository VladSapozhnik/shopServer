import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
// import { SequelizeModule } from '@nestjs/sequelize';
// import { User } from './entities/user.entity';
// import { Basket } from '../basket/entities/basket.entity';
// import { Rating } from '../rating/entities/rating.entity';
import { TokenModule } from '../token/token.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [TokenModule, PrismaModule],
  controllers: [UserController],
  providers: [UserService, JwtStrategy, JwtAuthGuard],
})
export class UserModule {}
