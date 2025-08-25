import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Device } from '../../device/entities/device.entity';

@Table
export class DeviceInfo extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;
  @ForeignKey(() => Device)
  deviceId: Device;
  @BelongsTo(() => Device, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  device: Device;
}
