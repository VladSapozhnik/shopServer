import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';
import { Authorized } from '../../decorators/authorized.decorator';
// import { User } from './entities/user.entity';
import { Authorization } from '../../decorators/authorization.decorator';
import type { Response } from 'express';
import type { User } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(
    @Res({ passthrough: true }) response: Response,
    @Body() createUserDto: CreateUserDto,
  ) {
    return this.userService.register(response, createUserDto);
  }

  @Post('login')
  login(
    @Res({ passthrough: true }) response: Response,
    @Body() loginDto: LoginDto,
  ) {
    return this.userService.login(response, loginDto);
  }

  @Authorization()
  @Get('profile')
  getProfile(@Authorized() user: User): User {
    return user;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
