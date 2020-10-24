const Sequelize = require('sequelize')
const db = require('../db')
const User = require('./users')
const Trip = require('./trips')
const Event = require('./events')
const ChatMessage = require('./chatMessages')
const MapLocation = require('./mapLocations')
const UserTrip = require('./userTrips')

User.belongsToMany(Trip, { through: UserTrip });
Trip.belongsToMany(User, { through: UserTrip });

UserTrip.belongsTo(User)
User.hasMany(UserTrip)

UserTrip.belongsTo(Trip)
Trip.hasMany(UserTrip)

Event.belongsTo(Trip)
Trip.hasMany(Event)

ChatMessage.belongsTo(User)
User.hasMany(ChatMessage)

ChatMessage.belongsTo(Trip)
Trip.hasMany(ChatMessage)

module.exports = {
  User,
  Trip,
  Event,
  ChatMessage,
  MapLocation,
  UserTrip,
}
