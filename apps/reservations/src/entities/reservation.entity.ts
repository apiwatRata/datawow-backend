import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { InferAttributes, InferCreationAttributes } from 'sequelize';

@Table({ 
  tableName: 'reservations',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
 })
export class Reservation extends Model<
  InferAttributes<Reservation>,
  InferCreationAttributes<Reservation>
> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    allowNull: false,
  })
  id: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
    references: { model: 'users', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  })
  user_id: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
    references: { model: 'concerts', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  })
  concert_id: string;

  @Column({
    type: DataType.ENUM('active', 'cancelled'),
    allowNull: false,
    defaultValue: 'active',
  })
  status: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  cancelled_at?: Date;

}
