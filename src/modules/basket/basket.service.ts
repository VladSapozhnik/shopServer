import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBasketDto } from './dto/create-basket.dto';
import { Basket, BasketDevice, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BasketService {
  constructor(private readonly prismaService: PrismaService) {}

  private async findBasket(userId: number): Promise<Basket> {
    const basket: Basket | null = await this.prismaService.basket.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            role: true,
            rating: true,
          },
        },
        devices: {
          include: {
            device: true,
          },
        },
      },
    });

    if (!basket) {
      throw new NotFoundException('Корзина не найдена!');
    }

    return basket;
  }

  private async totalPrice(basketId: number): Promise<number> {
    const result = await this.prismaService.$queryRaw<
      {
        total: number;
      }[]
    >`SELECT SUM(bd.quantity * d.price) AS TOTAL FROM "basket_devices" bd JOIN "devices" d ON d.id = bd."deviceId" WHERE bd."basketId" = ${basketId}`;

    return Number(result[0]?.total ?? 0);
  }

  async addDeviceToBasket(
    user: User,
    createBasketDto: CreateBasketDto,
    quantity: number = 1,
  ): Promise<Basket> {
    const basket: Basket = await this.getBasket(user);

    await this.prismaService.basketDevice.upsert({
      where: {
        basketId_deviceId: {
          basketId: basket.id,
          deviceId: createBasketDto.deviceId,
        },
      },
      create: {
        basketId: basket.id,
        deviceId: createBasketDto.deviceId,
      },
      update: {
        quantity: {
          increment: quantity,
        },
      },
    });

    return this.getBasket(user);
  }

  async getBasket(user: User): Promise<Basket & { totalPrice: number }> {
    const basket: Basket = await this.findBasket(user.id);

    const totalPrice: number = await this.totalPrice(basket.id);

    return { totalPrice, ...basket };
  }

  async removeOneDevice(
    user: User,
    deviceId: number,
    quantity: number = 1,
  ): Promise<Basket> {
    const basket: Basket = await this.findBasket(user.id);

    const basketDevice: BasketDevice | null =
      await this.prismaService.basketDevice.findUnique({
        where: { basketId_deviceId: { basketId: basket.id, deviceId } },
      });

    if (!basketDevice) {
      throw new NotFoundException('Устройство не найдено в корзине!');
    }

    if (basketDevice.quantity <= quantity) {
      await this.removeDevice(user, deviceId);
    } else {
      await this.prismaService.basketDevice.update({
        where: { id: basketDevice.id },
        data: {
          quantity: {
            decrement: quantity,
          },
        },
      });
    }

    return await this.getBasket(user);
  }

  async removeDevice(user: User, deviceId: number): Promise<Basket> {
    const basket: Basket | null = await this.findBasket(user.id);

    await this.prismaService.basketDevice.delete({
      where: {
        basketId_deviceId: {
          basketId: basket.id,
          deviceId,
        },
      },
    });

    return this.getBasket(user);
  }

  async clearAndGetBasket(user: User): Promise<Basket> {
    const basket: Basket | null = await this.findBasket(user.id);

    await this.prismaService.basketDevice.deleteMany({
      where: { basketId: basket.id },
    });

    return this.getBasket(user);
  }
}
