const router = require('express').Router()
const { ChatMessage, User } = require('../db/models')
const userOrAdmin = require('../utils/userOrAdmin.js')
const userOnly = require('../utils/userOnly.js')
module.exports = router

//GET mounted on /api/messages
router.get('/trip/:tripId', userOnly, async (req, res, next) => {
  try {
    const messages = await ChatMessage.findAll({
      order: [['createdAt', 'DESC']],
      where: {
        tripId: req.params.tripId
      },
      include: User
    })
    res.send(messages)
  } catch (error) {
    next(error)
  }
})

//POST mounted on /api/messages
router.post('/trip/:tripId/user/:userId', userOrAdmin, async (req, res, next) => {
  try {
    const newMessage = await ChatMessage.create({
      message: req.body.message,
      tripId: req.params.tripId,
      userId: req.params.userId
    })
    const message = await ChatMessage.findByPk(newMessage.id, {
      include: User
    })
    res.send(message)
  } catch (error) {
    next(error)
  }
})

