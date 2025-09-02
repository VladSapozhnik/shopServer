import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../../user/entities/user.entity';

import { Device } from '../../device/entities/device.entity';
import { BasketDevice } from './basket-device.entity';
@Table({ tableName: 'basket' })
export class Basket extends Model<Basket> {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;
  @BelongsTo(() => User)
  user: User;
  @BelongsToMany(() => Device, () => BasketDevice)
  devices: Device[];
}
