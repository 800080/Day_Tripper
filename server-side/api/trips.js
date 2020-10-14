const router = require('express').Router()
const { UserTrip, Trip, User } = require('../db/models')
module.exports = router

//GET mounted on /api/trips
router.get('/:userId', async (req, res, next) => {
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
