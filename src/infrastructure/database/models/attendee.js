const conf = require('../../../../config/appconfig');

const DISCORD_EVENT_SCHEMA = conf.dbschemas.discordevent;

module.exports = (sequelize, DataTypes) => {
  const Attendee = sequelize.define(
    'tags',
    {
      id: {
        type: DataTypes.UUID,
        unique: true,
        required: true,
        allowNull: false,
      },
      pseudo: {
        type: DataTypes.STRING(50),
        required: true,
        allowNull: false,
      },
      discordId: {
        type: DataTypes.STRING(50),
        unique: true,
        required: true,
        allowNull: false,
      },
      outingId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: 'outing',
          key: 'id',
        },
      },
      status: DataTypes.STRING(10),
    },
    {
      tableName: 'outing',
      paranoid: true,
      createdAt: 'creationDate',
      updatedAt: 'updateDate',
      deletedAt: 'deleteDate',
      schema: DISCORD_EVENT_SCHEMA,
    },
  );
};
