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
    const user: User | null = await this.userModel.findOne({
      where: { email: createUserDto.email },
    });

    if (user) {
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
    const user = await this.userModel.findOne({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new NotFoundException('Такой пользователь не найден!');
    }

    const isPassword: boolean = await bcrypt.compare(
      loginDto.password,
      user.dataValues.password,
    );

    if (!isPassword && user) {
      throw new NotFoundException('Такой пользователь не найден!');
    }

    const token: string = await this.auth(user);

    return { token };
  }

  private async auth(user: User) {
    const { assessToken } = await this.tokenService.generateToken(user);

    return assessToken;
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
