const Sequelize = require('sequelize')
const db = require('../db')

const Event = db.define('event', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { notEmpty: true }
  },
  location: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { notEmpty: true }
  },
  startTime: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  endTime: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  notes: {
    type: Sequelize.TEXT
  },
})

module.exports = Event
