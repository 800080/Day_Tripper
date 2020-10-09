const Sequelize = require('sequelize')
const db = require('../db')

const MapLocation = db.define('mapLocation', {
  longitude: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  latitude: {
    type: Sequelize.FLOAT,
    allowNull: false,
  }
})

module.exports = MapLocation
