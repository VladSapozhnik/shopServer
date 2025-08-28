import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Type } from '../../type/entities/type.entity';
import { Brand } from '../../brand/entities/brand.entity';
import { Rating } from '../../rating/entities/rating.entity';
import { Basket } from '../../basket/entities/basket.entity';
import { BasketDevice } from '../../basket/entities/basket-device.entity';
import { DeviceInfo } from '../../device-info/entities/device-info.entity';

interface deviceAttribute {
  name: string;
  price: number;
  brandId: number;
  typeId: number;
  img: string;
}

@Table({ tableName: 'devices' })
export class Device extends Model<Device, deviceAttribute> {
  @Column({ type: DataTypes.STRING, unique: true, allowNull: false })
  name: string;
  @Column({ type: DataTypes.INTEGER, allowNull: false })
  price: number;
  @Column({ type: DataTypes.INTEGER, defaultValue: 0 })
  rating: number;
  @Column({ type: DataTypes.STRING, allowNull: false })
  img: string;
  @ForeignKey(() => Type)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  typeId: number;
  @BelongsTo(() => Type)
  type: Type;
  @ForeignKey(() => Brand)
  @Column({ type: DataTypes.INTEGER, allowNull: false })
  brandId: number;
  @BelongsTo(() => Brand)
  brand: Brand;
  @HasMany(() => Rating)
  ratings: Rating[];
  @BelongsToMany(() => Basket, () => BasketDevice)
  baskets: Basket[];
  @HasMany(() => DeviceInfo, { as: 'info' })
  deviceInfos: DeviceInfo[];
}
