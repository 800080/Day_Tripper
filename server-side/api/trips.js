const router = require('express').Router()
const { UserTrip, Trip, User } = require('../db/models')
module.exports = router

//GET mounted on /api/trips
router.get('/user/:userId', async (req, res, next) => {
  try {
    const trips = await Trip.findAll({
      order: [['startDate', 'ASC']],
      include: {
        model: UserTrip,
        where: {
          userId: req.params.userId
        }
      }
    })
    res.send(trips)
  } catch (error) {
    next(error)
  }
})

//GET mounted on /api/trips
router.get('/:tripId', async (req, res, next) => {
  try {
    const singleTrip = await Trip.findByPk(req.params.tripId)
    res.send(singleTrip)
  } catch (error) {
    next(error)
  }
})

//POST mounted on /api/trips
router.post('/', async (req, res, next) => {
  try {
    const newTrip = await Trip.create(req.body)
    res.send(newTrip)
  } catch (error) {
    next(error)
  }
})
