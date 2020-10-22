const router = require('express').Router()
const { Event, MapLocation } = require('../db/models')
const userOnly = require('../utils/userOnly.js')
module.exports = router

//GET mounter on /api/events
router.get('/trip/:tripId', userOnly, async (req, res, next) => {
  try {
    const events = await Event.findAll({
      order: [['startTime', 'ASC']],
      where: {
        tripId: req.params.tripId
      },
      include: MapLocation
    })
    res.send(events)
  } catch (error) {
    next(error)
  }
})

//GET mounted on /api/events/:eventId
router.get('/:eventId', userOnly, async (req, res, next) => {
  try {
    const event = await Event.findByPk(req.params.eventId,{
      include: MapLocation
    })
    res.send(event)
  } catch (error) {
    next(error)
  }
})

//POST mounted on /api/events
router.post('/', userOnly, async (req, res, next) => {
  try {
    const event = await Event.create(req.body)
    res.send(event)
  } catch (error) {
    next(error)
  }
})

// PUT mounted on /api/events
router.put('/:evtId', userOnly, async (req, res, next) => {
  try {
    const foundEvent = await Event.findByPk(req.params.evtId)
    const updatedEvent = await foundEvent.update(req.body)
    res.send(updatedEvent)
  } catch (error) {
    next(error)
  }
})

// DELETE mounted on /api/events/:evtId
router.delete('/:evtId', userOnly, async (req, res, next) => {
  try {
    await Event.destroy({
      where: {
        id: req.params.evtId
      }
    })
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})
