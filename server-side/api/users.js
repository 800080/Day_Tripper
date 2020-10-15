const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

// GET mounted on /api/users/
router.get('/', async (req, res, next) => {
  try {
    console.log("IN USERS ROUTE")
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username', 'email']
    })
    res.json(users)
  } catch (err) {
    console.log('ERROR: ', err)
    next(err)
  }
})

// GET mounted on /api/user/email/:email
router.get('/email/:email', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.params.email
      },
      attributes: ['id', 'name', 'username', 'email']
    })
    if (!user) {
      return res.send({error: 'No user found'})
    }
    res.send(user)
  } catch (error) {
    next(error)
  }
})
