import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Basket } from './basket.entity';
import { Device } from '../../device/entities/device.entity';

@Table({ tableName: 'basket-devices' })
export class BasketDevice extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;
  @ForeignKey(() => Basket)
  @Column({ type: DataType.INTEGER, allowNull: false })
  basketId: number;

  @ForeignKey(() => Device)
  @Column({ type: DataType.INTEGER, allowNull: false })
  deviceId: number;
}
