const conf = require('../../../../config/appconfig');

const DISCORD_EVENT_SCHEMA = conf.dbschemas.discordevent;

module.exports = (sequelize, DataTypes) => {
  const outing = sequelize.define(
    'outing',
    {
      id: {
        type: DataTypes.UUID,
        unique: true,
        required: true,
        allowNull: false,
      },
      label: DataTypes.STRING(100),
      description: DataTypes.TEXT,
      period: {
        allowNull: false,
        type: DataTypes.RANGE(DataTypes.DATE),
      },
      creatorId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      creator: {
        type: DataTypes.JSONB,
      },
      place: DataTypes.STRING(100),
      attendeeMax: {
        type: DataTypes.NUMBER,
        allowNull: true,
      },
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
  outing.associate = function (models) {
    outing.addScope(
      'outing',
      {
        include: [{ model: models.attendee, required: true }],
      },
      { override: true },
    );
    outing.hasMany(models.attendees, {
      foreignKey: 'outingId',
    });
  };
  return outing;
};
