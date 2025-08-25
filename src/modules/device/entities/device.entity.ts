import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { DeviceInfo } from '../../device-info/entities/device-info.entity';
import { Type } from '../../type/entities/type.entity';
import { Rating } from '../../rating/entities/rating.entity';
import { BasketDevice } from '../../basket-device/entities/basket-device.entity';

@Table
export class Device extends Model {
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;
  @Column({ type: DataType.INTEGER, allowNull: false })
  price: number;
  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  rating: number;
  @Column({ type: DataType.STRING, allowNull: false })
  img: string;
  @HasMany(() => Rating, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  Ratings: Rating[];
  @HasMany(() => BasketDevice, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  BasketDevice: BasketDevice[];
  @HasMany(() => DeviceInfo, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  deviceInfos: DeviceInfo[];
  @ForeignKey(() => Type)
  typeId: Type;
  @BelongsTo(() => Type, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  device: Type;
}
