const router = require('express').Router()
const { UserTrip, Trip, User } = require('../db/models')
module.exports = router

//GET mounted on /api/trips
router.get('/user/:userId', async (req, res, next) => {
  try {
    const trips = await Trip.findAll({
      order: [['startDate', 'ASC']],
      include: [{
        model: User,
        // through: {attributes: ['userId']},
        where: {
          id: req.params.userId
        },
      }]
    })
    res.send(trips)
  } catch (error) {
    next(error)
  }
})

//GET mounted on /api/trips
router.get('/:tripId', async (req, res, next) => {
  try {
    const singleTrip = await Trip.findByPk(
      req.params.tripId)
    res.send(singleTrip)
  } catch (error) {
    next(error)
  }
})
