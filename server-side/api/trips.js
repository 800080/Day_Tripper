const router = require('express').Router()
const { UserTrip, Trip, User, Event } = require('../db/models')
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
router.get('/:tripId/user/:userId', async (req, res, next) => {
  try {
    const singleTrip = await Trip.findByPk(req.params.tripId, {
      include: {
        model: UserTrip,
        where: {
          userId: req.params.userId
        }
      }
    })
    res.send(singleTrip)
  } catch (error) {
    next(error)
  }
})

//POST mounted on /api/trips
router.post('/', async (req, res, next) => {
  try {
    const { tripInfo, user, guestList } = req.body
    const allGuests = [...guestList, user]
    const allGuestsIds = allGuests.map(guest => guest.id)
    const newTrip = await Trip.create(tripInfo)
    await newTrip.addUsers(allGuestsIds)
    res.send(newTrip)
  } catch (error) {
    next(error)
  }
})
