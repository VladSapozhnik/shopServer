import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Basket } from './basket.entity';
import { Device } from '../../device/entities/device.entity';

@Table({ tableName: 'basket_devices' })
export class BasketDevice extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;
  @Column({ type: DataType.INTEGER, defaultValue: 1 })
  quantity: number;

  @ForeignKey(() => Basket)
  @Column({ type: DataType.INTEGER, allowNull: false })
  basketId: number;
  @BelongsTo(() => Basket)
  basket: Basket;

  @ForeignKey(() => Device)
  @Column({ type: DataType.INTEGER, allowNull: false })
  deviceId: number;
  @BelongsTo(() => Device)
  device: Device;
}
