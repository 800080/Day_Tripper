const router = require('express').Router()
const { Event } = require('../db/models')
module.exports = router

//GET mounter on /api/events
router.get('/trip/:tripId', async (req, res, next) => {
  try {
    const events = await Event.findAll({
      order: [['startTime', 'ASC']],
      where: {
        tripId: req.params.tripId
      }
    })
    res.send(events)
  } catch (error) {
    next(error)
  }
})

//GET mounted on /api/events/:eventId
router.get('/:eventId', async (req, res, next) => {
  try {
    const event = await Event.findByPk(req.params.eventId)
    res.send(event)
  } catch (error) {
    next(error)
  }
})
