const Sequelize = require('sequelize')
const db = require('../db')

const MapLocation = db.define('mapLocation', {
  coordinate: {
    type: Sequelize.JSON,
    allowNull: false,
  },
})

MapLocation.beforeCreate((location) => {
  const { lat, lng } = location.coordinate
  const formatedCoordinate = {
    latitude: lat,
    longitude: lng,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  }
  location.coordinate = formatedCoordinate
})

module.exports = MapLocation
