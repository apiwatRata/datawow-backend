import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ 
  tableName: 'users',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
 })
export class User extends Model<User> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  username: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  birth_date: Date;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  sex: Number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  role_id: Number;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  deleted_at: Date;

}
