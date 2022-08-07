const { Sequelize } = require('sequelize');

const Outing = sequelize.define('tags', {
  id: {
    type: Sequelize.UUID,
    unique: true,
    required: true,
    allowNull: false,
  },
  description: Sequelize.TEXT,
  beginDate: {
    type: Sequelize.DATE,
    required: true,
    allowNull: false,
  },
  endDate: {
    type: Sequelize.DATE,
    required: true,
    allowNull: false,
  },
  place: Sequelize.TEXT,
  attendeeMax: {
    type: Sequelize.NUMBER,
    allowNull: true,
  },
  listInteressed: Sequelize.ARRAY(Sequelize.UUID),
  attendeeQueue: {
    type: Sequelize.ARRAY(Sequelize.UUID),
    allowNull: true,
  },
});
