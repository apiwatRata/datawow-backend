import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ 
  tableName: 'users',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
 })
export class User extends Model<User> {
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    unique: true,
  })
  email: String;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  password_hash: String;

  @Column({
    type: DataType.ENUM('ADMIN', 'USER'),
    allowNull: false,
    defaultValue: 'USER',
})
  role: String;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  deleted_at: Date;

}
