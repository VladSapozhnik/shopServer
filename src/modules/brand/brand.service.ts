import { ConflictException, Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Brand } from '@prisma/client';

@Injectable()
export class BrandService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createBrandDto: CreateBrandDto) {
    const brand: Brand | null = await this.prismaService.brand.findUnique({
      where: { name: createBrandDto.name },
    });

    if (brand) {
      throw new ConflictException('Такой бренд уже существует');
    }

    return this.prismaService.brand.create({
      data: createBrandDto,
    });
  }

  async findAll() {
    return this.prismaService.brand.findMany();
  }
}
