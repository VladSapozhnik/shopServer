import { ConflictException, Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Brand } from './entities/brand.entity';
import { Model } from 'sequelize-typescript';
import { BrandType } from './entities/brand-type.entity';

@Injectable()
export class BrandService {
  constructor(
    @InjectModel(Brand) private readonly brandModel: typeof Brand,
    @InjectModel(BrandType) private readonly BrandTypeModel: typeof BrandType,
  ) {}
  async create(createBrandDto: CreateBrandDto) {
    const brand = await this.brandModel.findOne({
      where: { name: createBrandDto.name },
    });

    if (brand) {
      throw new ConflictException('Такой бренд уже существует');
    }

    return await this.brandModel.create(createBrandDto);
  }

  async findAll() {
    return await this.brandModel.findAll();
  }
}
