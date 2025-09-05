import { ConflictException, Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
// import { InjectModel } from '@nestjs/sequelize';
import { PrismaService } from '../prisma/prisma.service';
import { Brand } from '@prisma/client';
// import { Brand } from './entities/brand.entity';
// import { Model } from 'sequelize-typescript';
// import { BrandType } from './entities/brand-type.entity';

@Injectable()
export class BrandService {
  constructor(
    private readonly prismaService: PrismaService,
    // @InjectModel(Brand) private readonly brandModel: typeof Brand,
    // @InjectModel(BrandType) private readonly BrandTypeModel: typeof BrandType,
  ) {}
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
