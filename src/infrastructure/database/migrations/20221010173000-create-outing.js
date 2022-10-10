const conf = require('../../../../config/appconfig');
const { comment } = require('../../../../config/migration-logger');

const DISCORD_EVENT_SCHEMA = conf.dbschemas.discordevent;
console.log('DISCORD_EVENT_SCHEMA : ', DISCORD_EVENT_SCHEMA);
const OUTING_TABLE = 'outing';

module.exports = {
  up: (queryInterface, Sequelize) => {
    comment.up(__filename);
    return queryInterface.createSchema(DISCORD_EVENT_SCHEMA).then(() => queryInterface.createTable(
      OUTING_TABLE,
      {
        id: {
          type: Sequelize.UUID,
          unique: true,
          required: true,
          allowNull: false,
        },
        label: Sequelize.STRING(100),
        description: Sequelize.TEXT,
        period: {
          allowNull: false,
          type: Sequelize.RANGE(Sequelize.DATE),
        },
        place: Sequelize.STRING(100),
        attendeeMax: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        creator: {
          type: Sequelize.JSONB,
          allowNull: true,
        },
        creationDate: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updateDate: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        deleteDate: {
          type: Sequelize.DATE,
        },
      },
      {
        schema: DISCORD_EVENT_SCHEMA,
      },
    ));
  },
  down: (queryInterface) => {
    comment.down(__filename);
    return queryInterface.dropTable({
      tableName: OUTING_TABLE,
      schema: DISCORD_EVENT_SCHEMA,
    });
  },
};
