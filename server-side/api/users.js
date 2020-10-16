const router = require('express').Router();
const { User, UserTrip } = require('../db/models');
module.exports = router;

// GET mounted on /api/users/
router.get('/', async (req, res, next) => {
  try {
    console.log('IN USERS ROUTE');
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username', 'email'],
    });
    res.json(users);
  } catch (err) {
    console.log('ERROR: ', err);
    next(err);
  }
});

// GET mounted on /api/users/email/:email (get guest to add to create trip list)
router.get('/email/:email', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.params.email,
      },
      attributes: ['id', 'name', 'username', 'email'],
    });
    if (!user) {
      return res.send({ error: 'No user found' });
    }
    res.send(user);
  } catch (error) {
    next(error);
  }
});

// GET mounted on /api/users/email/:email (get guest to add to guest list)
router.get('/email/:email/trips/:tripId', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.params.email,
      },
      attributes: ['id', 'name', 'username', 'email'],
    });
    if (!user) {
      return res.send({ error: 'No user found' });
    }
    const userTrips = await user.addTrip(req.params.tripId)
    user.dataValues.userTrips = [userTrips[0].dataValues]
    res.send(user);
  } catch (error) {
    next(error);
  }
});

// GET /api/users/trip/:tripId (get guests for single trip)
router.get('/trip/:tripId', async (req, res, next) => {
  try {
    const guests = await User.findAll({
      attributes: ['id', 'name', 'username', 'email'],
      include: {
        model: UserTrip,
        where: {
          tripId: req.params.tripId,
        },
      },
    });
    res.send(guests)
  } catch (error) {
    next(error);
  }
});
