const router = require("express").Router();
const { MapLocation, Event, Trip } = require("../db/models");
const userOnly = require('../utils/userOnly.js')

module.exports = router;

//POST mounted on /api/maps/trip
router.post('/trip', userOnly, async (req, res, next) =>{
  try {
    const { tripId, coordinate } = req.body
    const mapLocation = await MapLocation.create({coordinate})
    const trip = await Trip.findByPk(tripId)
    await trip.setMapLocation(mapLocation)
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }

})

//POST mounted on /api/maps/event
router.post('/event', userOnly, async (req, res, next) =>{
  try {
    const { eventId, coordinate } = req.body
    const mapLocation = await MapLocation.create({coordinate})
    const event = await Event.findByPk(eventId)
    await event.setMapLocation(mapLocation)
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }

})
