import { Column, DataType, HasMany, HasOne, Model, Table } from 'sequelize-typescript';
import { Basket } from '../../basket/entities/basket.entity';
import { Rating } from '../../rating/entities/rating.entity';

interface UserEntity {
  name: string;
  email: string;
  password: string;
}

@Table
export class User extends Model<User, UserEntity> {
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;
  @Column({ type: DataType.STRING, allowNull: false, defaultValue: 'USER' })
  role: string;
  @HasOne(() => Basket, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  basket: Basket;
  @HasMany(() => Rating, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  ratings: Rating[];
}
