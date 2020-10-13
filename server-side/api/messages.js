const router = require('express').Router()
const {ChatMessage} = require('../db/models')
module.exports = router

//GET mounted on /api/messages
router.get('/trip/:tripId', async (req, res, next) => {
  try {
    const messages = await ChatMessage.findAll({
      where: {
        tripId: req.params.tripId
      }
    })
    res.send(messages)
  } catch (error) {
    next(error)
  }
})

//POST mounted on /api/messages
router.post('/trip/:tripId/user/:userId', async (req, res, next) => {
  try {
    const newMessage = await ChatMessage.create({
      message: req.body.message,
      tripId: req.params.tripId,
      userId: req.params.userId
    })
    res.send(newMessage)
  } catch (error) {
    next(error)
  }
})

