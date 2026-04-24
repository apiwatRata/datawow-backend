import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { InferAttributes, InferCreationAttributes } from 'sequelize';

@Table({ 
  tableName: 'users',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
 })
export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id?: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  password_hash: string;

  @Column({
    type: DataType.ENUM('ADMIN', 'USER'),
    allowNull: false,
    defaultValue: 'USER',
})
  role?: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  deleted_at?: Date;

}
