const { Sequelize } = require('sequelize');

const Attendee = sequelize.define('tags', {
  id: {
    type: Sequelize.UUID,
    unique: true,
    required: true,
    allowNull: false,
  },
  pseudo: {
    type: Sequelize.TEXT,
    required: true,
    allowNull: false,
  },
  discordId: {
    type: Sequelize.TEXT,
    unique: true,
    required: true,
    allowNull: false,
  },
  outingsIds: {
    type: Sequelize.ARRAY(Sequelize.UUID),
    allowNull: true,
  },
  status: Sequelize.TEXT,
});
