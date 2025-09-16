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
import { CreateUserDto, CreateUserResponseDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';
import { Authorized } from '../../common/decorators/authorized.decorator';
import { Authorization } from '../../common/decorators/authorization.decorator';
import type { Response } from 'express';
import type { User } from '@prisma/client';
import { MessageInterceptor } from '../../common/interceptors/message.interceptor';
import { Message } from '../../common/decorators/message.decorator';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@UseInterceptors(MessageInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Создание аккаунта',
    description: 'Создает аккаунт для входа',
  })
  @ApiCreatedResponse({
    description: 'Пользователь создан',
    type: CreateUserResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Некорректные входные данные',
    example: {
      message: ['Поле email некорректное'],
      error: 'Bad Request',
      statusCode: 400,
    },
  })
  @ApiConflictResponse({
    description: 'Пользователь с таким email уже существует',
    example: {
      message: 'Пользователь с таким email уже существует',
      error: 'Conflict',
      statusCode: 409,
    },
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
  @ApiOkResponse({
    description: 'Вы успешно вошли в систему!',
    type: CreateUserResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Аккаунт не найден, пожалуйста создайте аккаунт!',
    example: {
      message: 'Такой пользователь не найден!',
      error: 'Not Found',
      statusCode: 404,
    },
  })
  @ApiBadRequestResponse({
    description: 'Некорректные входные данные',
    example: {
      message: ['Поле почта некорректное'],
      error: 'Bad Request',
      statusCode: 400,
    },
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
    summary: 'Получение данных',
    description: 'Получение данных когда вы уже авторизовались',
  })
  @ApiOkResponse({
    description: 'Вы получили данные пользователя',
    example: {
      message: 'Операция выполнена успешно!',
      data: {
        id: 1,
        name: 'Mark',
        email: 'test@gmail.com',
        password: '$2b$10$e/M3s53IVXDiirt2kYx6',
        role: 'USER',
        createAt: '2025-09-11T08:52:17.869Z',
        updateAt: '2025-09-11T08:52:17.869Z',
        basket: {
          id: 1,
          userId: 1,
        },
        rating: [],
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Вы не авторизованные!',
    example: {
      message: 'Unauthorized',
      statusCode: 401,
    },
  })
  @Authorization()
  @Get('profile')
  getProfile(@Authorized() user: User): User {
    return user;
  }

  @ApiOperation({
    summary: 'Выход из аккаунта',
    description: 'Выходит из аккаунта и убирает его привилегии',
  })
  @ApiUnauthorizedResponse({
    description: 'Вы не авторизованные!',
    example: {
      message: 'Unauthorized',
      statusCode: 401,
    },
  })
  @ApiOkResponse({
    description: 'Вы успешно вышли из аккаунта',
    example: {
      message: 'Вы успешно вышли из системы!',
      data: true,
    },
  })
  @Message('Вы успешно вышли из системы!')
  @Authorization()
  @Get('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    return this.userService.logout(response);
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
