import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
	tableName: 'outing'
  })
export class Outing extends Model<InferAttributes<Outing>, InferCreationAttributes<Outing>> {
	@Column({
		type: DataType.UUID,
		allowNull: false,
		primaryKey: true,
		unique: true,
		defaultValue: DataType.UUIDV4
	})
	declare id;

	@Column({
		type: DataType.STRING(100),
		allowNull: false,
	})
	declare label: string;

	@Column({
		type: DataType.STRING(50),
		allowNull: false,
	})
	declare description: string;

	@Column({
		type: DataType.RANGE(DataType.DATE),
		allowNull: false,
	})
	declare period: string;

	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	declare creatorId: string;

	@Column({
		type: DataType.JSONB,
	})
	declare creator: string;

	@Column({
		type: DataType.STRING(100),
		allowNull: false,
	})
	declare place: string;

	@Column({
		type: DataType.NUMBER,
		allowNull: false,
	})
	declare attendeeMax: number;
}
