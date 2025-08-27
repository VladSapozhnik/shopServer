import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Brand } from './entities/brand.entity';
import { BrandType } from './entities/brand-type.entity';
import { Device } from '../device/entities/device.entity';
import { Type } from '../type/entities/type.entity';

@Module({
  imports: [SequelizeModule.forFeature([Brand, BrandType, Device, Type])],
  controllers: [BrandController],
  providers: [BrandService],
})
export class BrandModule {}
