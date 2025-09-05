import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBasketDto } from './dto/create-basket.dto';
import { Basket, BasketDevice, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BasketService {
  constructor(private readonly prismaService: PrismaService) {}
  async addDeviceToBasket(
    user: User,
    createBasketDto: CreateBasketDto,
    quantity: number = 1,
  ) {
    const basket: Basket = await this.getBasket(user);

    const basketDevice: BasketDevice | null =
      await this.prismaService.basketDevice.findFirst({
        where: {
          basketId: basket.id,
          deviceId: createBasketDto.deviceId,
        },
      });

    if (basketDevice) {
      await this.prismaService.basketDevice.update({
        where: {
          id: basketDevice.id,
        },
        data: {
          quantity: {
            increment: quantity,
          },
        },
      });
    } else {
      await this.prismaService.basketDevice.create({
        data: {
          basketId: +basket.id,
          deviceId: +createBasketDto.deviceId,
        },
      });
    }

    return this.getBasket(user);
  }

  async getBasket(user: User): Promise<Basket> {
    const basket: Basket | null = await this.prismaService.basket.findUnique({
      where: {
        userId: Number(user.id),
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            role: true,
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
      throw new NotFoundException('Корзина не найдена');
    }

    return basket;
  }

  async removeOneDevice(user: User, deviceId: number, quantity: number = 1) {
    const basket: Basket = await this.getBasket(user);

    const basketDevice: BasketDevice | null =
      await this.prismaService.basketDevice.findFirst({
        where: { basketId: basket.id, deviceId },
      });

    if (!basketDevice) {
      throw new NotFoundException('Корзина не найдена!');
    }

    const newQuantity = basketDevice.quantity - quantity;

    if (newQuantity <= 0) {
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

  async removeDevice(user: User, deviceId: number) {
    const basket: Basket | null = await this.getBasket(user);

    if (!basket) {
      throw new NotFoundException('Корзина не найдена');
    }

    await this.prismaService.basketDevice.delete({
      where: { basketId_deviceId: { basketId: basket.id, deviceId } },
    });

    return await this.getBasket(user);
  }
}
