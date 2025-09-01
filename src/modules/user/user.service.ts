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

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    private readonly tokenService: TokenService,
  ) {}
  async register(createUserDto: CreateUserDto): Promise<any> {
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

    const token: string = await this.auth(newUser);

    return {
      token,
    };
  }

  async login(loginDto: LoginDto) {
    const existUser = await this.userModel.findOne({
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

    const token: string = await this.auth(existUser);

    return { token };
  }

  private async auth(user: User) {
    const { assessToken } = await this.tokenService.generateToken(user);

    return assessToken;
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
