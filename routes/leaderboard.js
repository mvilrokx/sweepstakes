var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('leaderboard', {
    bodyClasses: 'bg-green',
    title: 'Leaderboard'
  })
})

module.exports = router
