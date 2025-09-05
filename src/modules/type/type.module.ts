import { Module } from '@nestjs/common';
import { TypeService } from './type.service';
import { TypeController } from './type.controller';
import { PrismaModule } from '../prisma/prisma.module';
// import { SequelizeModule } from '@nestjs/sequelize';
// import { Type } from './entities/type.entity';
// import { Device } from '../device/entities/device.entity';
// import { BrandType } from '../brand/entities/brand-type.entity';

@Module({
  imports: [PrismaModule],
  // imports: [SequelizeModule.forFeature([Type, Device, BrandType])],
  controllers: [TypeController],
  providers: [TypeService],
})
export class TypeModule {}
