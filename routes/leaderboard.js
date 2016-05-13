const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('leaderboard', {
    bodyClasses: 'bg-green',
    title: 'Leaderboard'
  })
})

module.exports = router
