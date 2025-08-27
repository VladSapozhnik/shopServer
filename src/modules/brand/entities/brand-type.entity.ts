import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Brand } from './brand.entity';
import { Type } from '../../type/entities/type.entity';
@Table({ tableName: 'brandTypes' })
export class BrandType extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;
  @ForeignKey(() => Brand)
  @Column({ type: DataType.INTEGER, allowNull: false })
  brandId: number;
  @ForeignKey(() => Type)
  @Column({ type: DataType.INTEGER, allowNull: false })
  typeId: number;
}
