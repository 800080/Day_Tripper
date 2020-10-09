const Sequelize = require('sequelize')
const db = require('../db')

const UserTrip = db.define('userTrip', {
  isHost: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'pending',
    validate: {
      isIn: [['accepted', 'rejected', 'pending']],
    }
  },
})

module.exports = UserTrip
