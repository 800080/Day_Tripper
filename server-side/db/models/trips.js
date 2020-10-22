const Sequelize = require('sequelize')
const db = require('../db')

const Trip = db.define('trip', {
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
  startDate: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  endDate: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  notes: {
    type: Sequelize.TEXT,
  },

})

module.exports = Trip
