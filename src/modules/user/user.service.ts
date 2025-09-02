import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { TokenService } from '../token/token.service';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';
import type { Response } from 'express';
import { isDev } from '../../utils/is-dev.util';
import ms, { type StringValue } from 'ms';

@Injectable()
export class UserService {
  private readonly REFRESH_EXPIRES_IN: string;
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
  ) {
    this.REFRESH_EXPIRES_IN =
      this.configService.getOrThrow<string>('jwt_refresh_token');
  }
  async register(
    response: Response,
    createUserDto: CreateUserDto,
  ): Promise<any> {
    const existUser: User | null = await this.userModel.findOne({
      where: { email: createUserDto.email },
    });

    if (existUser) {
      throw new ConflictException('Пользователь с таким email уже существует');
    }

    const hashPassword: string = await bcrypt.hash(createUserDto.password, 10);

    const newUser: User = await this.userModel.create({
      ...createUserDto,
      password: hashPassword,
    });

    await newUser.$create('basket', {});

    const token: string = await this.auth(response, newUser);

    return {
      token,
    };
  }

  async login(response: Response, loginDto: LoginDto) {
    const existUser: User | null = await this.userModel.findOne({
      where: { email: loginDto.email },
    });

    if (!existUser) {
      throw new NotFoundException('Такой пользователь не найден!');
    }

    const isPassword: boolean = await bcrypt.compare(
      loginDto.password,
      existUser.dataValues.password,
    );

    if (!isPassword && existUser) {
      throw new NotFoundException('Такой пользователь не найден!');
    }

    const token: string = await this.auth(response, existUser);

    return { token };
  }

  private async auth(response: Response, user: User): Promise<string> {
    const { assessToken, refreshToken } =
      await this.tokenService.generateToken(user);

    this.setCookie(response, refreshToken, this.REFRESH_EXPIRES_IN);

    return assessToken;
  }

  private setCookie(response: Response, value: string, days: string) {
    const maxAge: number = Number(ms(days as StringValue));

    if (maxAge === undefined || maxAge === null) {
      throw new Error(
        `Неверный формат JWT_REFRESH_TOKEN: "${this.REFRESH_EXPIRES_IN}". Пример: "7d", "24h", "30m"`,
      );
    }

    response.cookie('refreshToken', value, {
      httpOnly: true,
      maxAge,
      domain: this.configService.getOrThrow<string>('cookie_domain'),
      secure: !isDev(this.configService),
      sameSite: isDev(this.configService) ? 'none' : 'lax',
    });
  }

  async validate(id: number, email: string): Promise<User> {
    const existUser: User | null = await this.userModel.findOne({
      where: { id, email },
      attributes: {
        exclude: ['password'],
      },
      include: {
        all: true,
      },
    });

    if (!existUser) {
      throw new NotFoundException('Пользователь не найден!');
    }

    return existUser;
  }

  // async existUser(user: User) {
  //   const where = {};
  //
  //   if (user.id) {
  //     where['id'] = Number(user.id);
  //   }
  //
  //   if (user.email) {
  //     where['email'] = user.email;
  //   }
  //
  //   const findUser: User | null = await this.userModel.findOne({ where });
  //
  //   if (!findUser) {
  //     throw new NotFoundException('Такой пользователь не найден!');
  //   }
  //
  //   return findUser;
  // }
  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
