import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Device } from './device.entity';

interface DeviceInfoAttributes {
  title: string;
  description: string;
  deviceId: number;
}

@Table({ tableName: 'device-infos' })
export class DeviceInfo extends Model<DeviceInfo, DeviceInfoAttributes> {
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;
  @ForeignKey(() => Device)
  @Column({ type: DataType.INTEGER, allowNull: false })
  deviceId: number;
  @BelongsTo(() => Device)
  device: Device;
}
