import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Device } from '../../device/entities/device.entity';
@Table
export class BasketDevice extends Model {
  @ForeignKey(() => Device)
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  deviceId: number;
  @BelongsTo(() => Device, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  device: Device;
}
