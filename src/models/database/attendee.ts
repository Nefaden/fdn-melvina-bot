import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

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
	declare discordId: string;
}
