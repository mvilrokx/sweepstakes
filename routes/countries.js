const router = require('express').Router()

const Country = require('../models/country.js')

router.get('/', (req, res, next) => {
  new Country().fetchAll()
    .then((countries) => {
      res.status(200).json(countries.toJSON())
    })
    .catch((err) => {
      next(err)
    })
})

module.exports = router
