import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Device } from '../../device/entities/device.entity';
import { Type } from '../../type/entities/type.entity';
import { BrandType } from './brand-type.entity';

interface brandAttribute {
  name: string;
}
@Table({ tableName: 'brands' })
export class Brand extends Model<Brand, brandAttribute> {
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;
  @HasMany(() => Device)
  devices: Device[];
  @BelongsToMany(() => Type, () => BrandType)
  Types: Type[];
}
