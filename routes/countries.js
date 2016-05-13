const router = require('express').Router()

const knex = require('../db/knex.js')

router.get('/', (req, res, next) => {
  knex('countries').select()
    .then((countries) => {
      res.status(200).json(countries)
    })
    .catch((error) => {
      next(error)
    })
})

module.exports = router
