const Sequelize = require('sequelize')
const db = require('../db')

const ChatMessage = db.define('chatMessage', {
  message: {
    type: Sequelize.TEXT,
    allowNull: false,
  }
})

module.exports = ChatMessage
