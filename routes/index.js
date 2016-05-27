const router = require('express').Router()
const Tournament = require('../models/tournament.js')

router.get('/', (req, res, next) => {
  new Tournament().fetchAll()
    .then((tournaments) => {
      res.render('index', {
        isLoggedIn: req.isAuthenticated(),
        user: req.user,
        tournaments: tournaments.toJSON()
      })
    })
    .catch((err) => {
      next(err)
    })
})

module.exports = router
