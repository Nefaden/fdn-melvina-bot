import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Outing } from './outing';

@Table({
	tableName: 'attendee'
  })
export class Attendee extends Model<InferAttributes<Attendee>, InferCreationAttributes<Attendee>> {
	@Column({
		type: DataType.UUID,
		allowNull: false,
		primaryKey: true,
		unique: true,
		defaultValue: DataType.UUIDV4
	})
	declare id;

	@Column({
		type: DataType.STRING(50),
		allowNull: false,
	})
	declare pseudo: string;

	@Column({
		type: DataType.STRING(50),
		allowNull: false,
	})
	declare discordId: string;

	@Column({
		type: DataType.UUID,
		allowNull: false,
	})
	@ForeignKey(() => Outing)
	declare outingId: string;

	@Column({
		type: DataType.STRING(10),
		allowNull: false,
	})
	declare status: string;
}
