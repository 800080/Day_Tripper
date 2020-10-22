module.exports = (req, res, next) => {
  if (
    !!req.user &&
    (req.user.isAdmin || req.user.dataValues.id === Number(req.params.userId))
  ) {
    next()
  } else {
    const error = new Error('Not authorized.')
    error.status = 401
    next(error)
  }
}
