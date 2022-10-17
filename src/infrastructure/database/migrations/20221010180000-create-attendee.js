const conf = require('../../../../config/appconfig');
const { comment } = require('../../../../config/migration-logger');

const DISCORD_EVENT_SCHEMA = conf.dbschemas.discordevent;
console.log('DISCORD_EVENT_SCHEMA : ', DISCORD_EVENT_SCHEMA);
const ATTENDEE_TABLE = 'attendee';

module.exports = {
	up: (queryInterface, Sequelize) => {
		comment.up(__filename);
		return queryInterface.createTable(
			ATTENDEE_TABLE,
			{
				id: {
					type: Sequelize.UUID,
					unique: true,
					required: true,
					allowNull: false,
				},
				pseudo: {
					type: Sequelize.STRING(50),
					required: true,
					allowNull: false,
				},
				discordId: {
					type: Sequelize.STRING(50),
					unique: true,
					required: true,
					allowNull: false,
				},
				outingId: {
					allowNull: false,
					type: Sequelize.UUID,
					references: {
						model: 'outing',
						schema: DISCORD_EVENT_SCHEMA,
					},
				},
				status: Sequelize.STRING(10),
			},
			{
				schema: DISCORD_EVENT_SCHEMA,
			},
		);
	},
	down: (queryInterface) => {
		comment.down(__filename);
		return queryInterface.dropTable({
			tableName: ATTENDEE_TABLE,
			schema: DISCORD_EVENT_SCHEMA,
		});
	},
};
