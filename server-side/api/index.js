const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/messages', require('./messages'))
router.use('/trips', require('./trips'))
router.use('/events', require('./events'))
router.use('/maps', require('./mapLocations'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
