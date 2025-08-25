import {
  Table,
  Model,
  BelongsTo,
  Column,
  DataType, ForeignKey, HasMany,
} from 'sequelize-typescript';
import { User } from '../../user/entities/user.entity';
import { BasketDevice } from '../../basket-device/entities/basket-device.entity';
@Table
export class Basket extends Model {
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;
  @BelongsTo(() => User, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  user: User;
  @HasMany(() => BasketDevice, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  Baskets: BasketDevice[];
}
