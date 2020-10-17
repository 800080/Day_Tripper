const Sequelize = require('sequelize')
const db = require('../db')

const MapLocation = db.define('mapLocation', {
  coordinate: {
    type: Sequelize.JSON,
    allowNull: false,
  },
})

module.exports = MapLocation
