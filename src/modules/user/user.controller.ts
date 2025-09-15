import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';
import { Authorized } from '../../common/decorators/authorized.decorator';
import { Authorization } from '../../common/decorators/authorization.decorator';
import type { Response } from 'express';
import type { User } from '@prisma/client';
import { MessageInterceptor } from '../../common/interceptors/message.interceptor';
import { Message } from '../../common/decorators/message.decorator';
import { ApiOperation } from '@nestjs/swagger';

@UseInterceptors(MessageInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Создание аккаунта',
    description: 'Создает аккаунт для входа',
  })
  @Message('Вы успешно зарегистрировались')
  @Post('register')
  register(
    @Res({ passthrough: true }) response: Response,
    @Body() createUserDto: CreateUserDto,
  ) {
    return this.userService.register(response, createUserDto);
  }

  @ApiOperation({
    summary: 'Вход в аккаунт',
    description: 'Вход в существующий аккаунт и дает доступ',
  })
  @Message('Вы успешно вошли в систему!')
  @Post('login')
  login(
    @Res({ passthrough: true }) response: Response,
    @Body() loginDto: LoginDto,
  ) {
    return this.userService.login(response, loginDto);
  }

  @ApiOperation({
    summary: 'Получения данных',
    description: 'Получение данных когда вы уже авторизовались',
  })
  @Authorization()
  @Get('profile')
  getProfile(@Authorized() user: User): User {
    return user;
  }

  @ApiOperation({
    summary: 'Выход из аккаунта',
    description: 'Выходит из аккаунта и убирает его привелегии',
  })
  @Message('Вы успешно вышли из системы!')
  @Authorization()
  @Get('logout')
  logout(@Res() response: Response) {
    return this.userService.logout(response);
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
