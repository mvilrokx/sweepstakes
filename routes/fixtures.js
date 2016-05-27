const router = require('express').Router()

const Fixture = require('../models/fixture.js')

router.get('/:tournament_id/fixtures/:fixture_id', (req, res, next) => {
  new Fixture({tournament_id: req.params.tournament_id, id: req.params.fixture_id})
    .fetch({
      withRelated: ['home', 'away', 'home.country', 'away.country']
    })
    .then((fixture) => {
      res.status(200).json(fixture.toJSON())
    })
    .catch((error) => {
      next(error)
    })
})

router.get('/:tournament_id/fixtures', (req, res, next) => {
  new Fixture({tournament_id: req.params.tournament_id})
    .fetchAll({
      withRelated: ['home', 'away', 'home.country', 'away.country']
    })
    .then((fixture) => {
      res.status(200).json(fixture.toJSON())
    })
    .catch((error) => {
      next(error)
    })
})

module.exports = router
