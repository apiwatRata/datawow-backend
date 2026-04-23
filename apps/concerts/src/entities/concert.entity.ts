import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { InferAttributes, InferCreationAttributes } from 'sequelize';

@Table({ 
  tableName: 'concerts',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
 })
export class Concert extends Model<
  InferAttributes<Concert>,
  InferCreationAttributes<Concert>
> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    allowNull: false,
  })
  id: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: { min: 1 },
  })
  total_seats: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  reserved_seats: number;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  deleted_at?: Date;

}
