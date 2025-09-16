import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { FilesService } from '../files/files.service';
import { PrismaService } from '../prisma/prisma.service';
import { Device, DeviceInfo } from '@prisma/client';

@Injectable()
export class DeviceService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly filesService: FilesService,
  ) {}
  async create(
    createDeviceDto: CreateDeviceDto,
    image: Express.Multer.File,
  ): Promise<Device> {
    const existDevice: Device | null =
      await this.prismaService.device.findUnique({
        where: { name: createDeviceDto.name },
      });

    if (existDevice) {
      throw new ConflictException('Device с таким названием уже существует');
    }

    const fileName: string = await this.filesService.createFile(image);

    const infoArray = createDeviceDto.info
      ? (JSON.parse(createDeviceDto.info) as DeviceInfo[])
      : [];

    return this.prismaService.device.create({
      data: {
        ...createDeviceDto,
        img: fileName,
        deviceInfos: {
          create: infoArray.map((infoItem) => ({
            title: infoItem.title,
            description: infoItem.description,
          })),
        },
      },
      include: {
        deviceInfos: true,
      },
    });
  }

  async findAll(
    brandId: number,
    typeId: number,
    page: number = 1,
    limit: number = 9,
  ) {
    const offset: number = (page - 1) * limit;

    const where = {};

    if (brandId) {
      where['brandId'] = brandId;
    }

    if (typeId) {
      where['typeId'] = typeId;
    }

    const devices = await this.prismaService.device.findMany({
      where,
      skip: offset,
      take: limit,
      include: {
        ratings: true,
        deviceInfos: true,
      },
    });

    const totalCount = await this.prismaService.device.count({ where });

    return {
      count: totalCount,
      rows: devices,
    };
  }

  async findOne(id: number) {
    const device = await this.prismaService.device.findUnique({
      where: { id: id },
    });

    if (!device) {
      throw new NotFoundException('Такой девайс не найден!');
    }

    return device;
  }
}
