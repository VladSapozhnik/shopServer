import { Injectable } from '@nestjs/common';
import { CreateBasketDto } from './dto/create-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Basket } from './entities/basket.entity';
import { BasketDevice } from './entities/basket-device.entity';
import { User } from '../user/entities/user.entity';
import { Device } from '../device/entities/device.entity';
import { DeviceInfo } from '../device/entities/device-info.entity';
import { Type } from '../type/entities/type.entity';

@Injectable()
export class BasketService {
  constructor(
    @InjectModel(Basket) private readonly basketModel: typeof Basket,
    @InjectModel(BasketDevice)
    private readonly basketDeviceModel: typeof BasketDevice,
  ) {}
  create(createBasketDto: CreateBasketDto) {
    return 'This action adds a new basket';
  }

  findAll() {
    return `This action returns all basket`;
  }

  async getBasket(user: User) {
    return await this.basketModel.findOne({
      where: {
        userId: Number(user.dataValues.id),
      },
      include: [
        {
          model: User,
          attributes: {
            exclude: ['password'],
          },
        },
        {
          model: Device,
          through: { attributes: ['quantity'] },
          include: [{ model: DeviceInfo, as: 'info' }, { model: Type }],
        },
      ],
    });
  }

  update(id: number, updateBasketDto: UpdateBasketDto) {
    return `This action updates a #${id} basket`;
  }

  remove(id: number) {
    return `This action removes a #${id} basket`;
  }
}
