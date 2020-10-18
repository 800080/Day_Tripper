const router = require("express").Router();
const { MapLocation } = require("../db/models");
module.exports = router;

//POST mounted on /api/maps

router.post('/', async (req, res, next) =>{
  try {
    const { tripIdOrEventId, coordinate } = req.body
    const mapLocation = await MapLocation.create({coordinate})
    await mapLocation.addTrip(tripIdOrEventId)
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }

})
