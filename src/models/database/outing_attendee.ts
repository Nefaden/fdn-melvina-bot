import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Outing } from './outing';
import { Attendee } from './attendee';
import { Outing_AttendeeStatus } from 'src/models/outing_attendeeStatus.enum';

@Table({
	tableName: 'outing_attendee'
})
export class Outing_Attendee extends Model<InferAttributes<Outing_Attendee>, InferCreationAttributes<Outing_Attendee>> {
	@Column({
		type: DataType.UUID,
		allowNull: false,
	})
    @ForeignKey(() => Outing)
	declare outingId: string;

    @Column({
		type: DataType.UUID,
		allowNull: false,
	})
    @ForeignKey(() => Attendee)
	declare attendeeId: string;

    @Column({
		type: DataType.ENUM('attendee', 'wait'),
		allowNull: false,
	})
	declare status: Outing_AttendeeStatus;

	@Column({
		type: DataType.DATE,
		allowNull: false,
	})
	declare date: Date;
}
