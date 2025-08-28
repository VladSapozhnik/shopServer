import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Device } from '../../device/entities/device.entity';
import { Brand } from '../../brand/entities/brand.entity';
import { BrandType } from '../../brand/entities/brand-type.entity';

interface TypeAttribute {
  name: string;
}
@Table({ tableName: 'types' })
export class Type extends Model<Type, TypeAttribute> {
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;
  @HasMany(() => Device)
  devices: Device[];
  @BelongsToMany(() => Brand, () => BrandType)
  brand: Brand[];
}
