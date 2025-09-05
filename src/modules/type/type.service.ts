import { ConflictException, Injectable } from '@nestjs/common';
import { CreateTypeDto } from './dto/create-type.dto';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class TypeService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createTypeDto: CreateTypeDto) {
    const type = await this.prismaService.type.findUnique({
      where: { name: createTypeDto.name },
    });

    if (type) {
      throw new ConflictException('Такая категория уже существует!');
    }

    return this.prismaService.type.create({ data: createTypeDto });
  }

  async findAll() {
    return this.prismaService.type.findMany({
      select: { id: true, name: true },
    });
  }
}
