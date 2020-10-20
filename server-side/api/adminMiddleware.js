module.exports = (req, res, next) => {
  if (!!req.user && req.user.isAdmin) {
    console.log('req>>>>>>>>> ', req)
    next()
  } else {
    const err = new Error("Unauthorized")
    err.status = 401
    next(err)
  }
}
