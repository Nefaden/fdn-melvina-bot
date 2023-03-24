import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { OutingType } from 'src/models/outingType.enum';

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
	declare period: Array<Date>;

	@Column({
		type: DataType.ENUM('irl', 'vocal'),
		allowNull: false,
	})
	declare type: OutingType;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	declare creatorDiscordId: string;

	@Column({
		type: DataType.STRING(100),
		allowNull: false,
	})
	declare place: string;

	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	declare attendeeMax: number;
}
