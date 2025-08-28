import { ConflictException, Injectable } from '@nestjs/common';
import { CreateTypeDto } from './dto/create-type.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Type } from './entities/type.entity';

@Injectable()
export class TypeService {
  constructor(@InjectModel(Type) private readonly typeModel: typeof Type) {}
  async create(createTypeDto: CreateTypeDto) {
    const type = await this.typeModel.findOne({
      where: { name: createTypeDto.name },
    });

    if (type) {
      throw new ConflictException('Такая категория уже существует!');
    }

    return await this.typeModel.create(createTypeDto);
  }

  async findAll() {
    return await this.typeModel.findAll({ include: { all: true } });
  }
}
