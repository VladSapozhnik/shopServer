import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TokenModule } from '../token/token.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Module({
  imports: [TokenModule],
  controllers: [UserController],
  providers: [UserService, JwtStrategy, JwtAuthGuard],
})
export class UserModule {}
