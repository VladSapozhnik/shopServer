import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBasketDto } from './dto/create-basket.dto';
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
  async addDeviceToBasket(
    user: User,
    createBasketDto: CreateBasketDto,
    quantity: number = 1,
  ): Promise<BasketDevice> {
    const basket: Basket = await this.getBasket(user);

    const [basketDevice, create] = await this.basketDeviceModel.findOrCreate({
      where: {
        basketId: basket.dataValues.id,
        deviceId: createBasketDto.deviceId,
      },
      defaults: { quantity },
    });

    if (!create) {
      await basketDevice.increment('quantity', { by: quantity });
      return await basketDevice.reload();
    }

    return basketDevice;
  }

  async getBasket(user: User): Promise<Basket> {
    const basket: Basket | null = await this.basketModel.findOne({
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

    if (!basket) {
      throw new NotFoundException('Корзина не найдена');
    }

    return basket;
  }

  update(user: User, deviceId: number) {
    return `This action updates a #${deviceId} basket`;
  }

  async removeDevice(user: User, deviceId: number) {
    const basket: Basket = await this.getBasket(user);

    await this.basketDeviceModel.destroy({
      where: { basketId: basket.dataValues.id, deviceId },
    });

    return await this.getBasket(user);
  }
}
