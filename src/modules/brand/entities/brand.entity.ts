import {
  BelongsToMany,
  Column,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Device } from '../../device/entities/device.entity';
import { Type } from '../../type/entities/type.entity';
import { BrandType } from './brand-type.entity';
@Table({ tableName: 'brands' })
export class Brand extends Model {
  @Column({ type: DataTypes.STRING, unique: true, allowNull: false })
  name: string;
  @HasMany(() => Device)
  devices: Device[];
  @BelongsToMany(() => Type, () => BrandType)
  brandTypes: BrandType[];
}
