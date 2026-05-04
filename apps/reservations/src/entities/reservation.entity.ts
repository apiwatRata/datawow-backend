import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { User } from 'apps/users/src/entities/user.entity';
import { Concert } from 'apps/concerts/src/entities/concert.entity';

@Table({ 
  tableName: 'reservations',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  timestamps: true,
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
  declare id?: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    references: { model: 'users', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  })
  user_id: string;

  @ForeignKey(() => Concert)
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
  status?: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  cancelled_at?: Date;

  @BelongsTo(() => User, { foreignKey: 'user_id' })
  user?: User;

  @BelongsTo(() => Concert, { foreignKey: 'concert_id' })
  concert?: Concert;

}
