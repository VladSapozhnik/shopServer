import { Injectable } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Device } from './entities/device.entity';
import { FilesService } from '../files/files.service';
import { DeviceInfo } from './entities/device-info.entity';

@Injectable()
export class DeviceService {
  constructor(
    @InjectModel(Device) private readonly deviceModel: typeof Device,
    @InjectModel(DeviceInfo)
    private readonly deviceInfoModel: typeof DeviceInfo,
    private readonly filesService: FilesService,
  ) {}
  async create(
    createDeviceDto: CreateDeviceDto,
    image: Express.Multer.File,
  ): Promise<Device> {
    const fileName: string = await this.filesService.createFile(image);

    const device: Device = await this.deviceModel.create({
      ...createDeviceDto,
      img: fileName,
    });

    if (createDeviceDto.info?.length) {
      const infoArray = JSON.parse(createDeviceDto.info) as DeviceInfo[];

      await Promise.all(
        infoArray.map(
          (infoItem: DeviceInfo): Promise<DeviceInfo> =>
            this.deviceInfoModel.create({
              title: infoItem.title,
              description: infoItem.description,
              deviceId: +device.id,
            }),
        ),
      );

      return device;
    }

    return device;
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

    return await this.deviceModel.findAndCountAll({
      where,
      limit,
      offset,
      include: { all: true },
    });
  }

  findOne(id: number) {
    return this.deviceModel.findByPk(id, {
      include: [{ model: DeviceInfo, as: 'info' }],
    });
  }
}
