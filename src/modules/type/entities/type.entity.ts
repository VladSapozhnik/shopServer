import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Device } from '../../device/entities/device.entity';

@Table
export class Type extends Model {
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;
  @HasMany(() => Device, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  devices: Device[];
}
