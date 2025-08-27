import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Device } from '../../device/entities/device.entity';
@Table({ tableName: 'device-infos' })
export class DeviceInfo extends Model {
  @Column({ type: DataTypes.STRING, allowNull: false })
  title: string;
  @Column({ type: DataTypes.STRING, allowNull: false })
  description: string;
  @ForeignKey(() => Device)
  deviceId: Device;
  @BelongsTo(() => Device)
  device: Device;
}
