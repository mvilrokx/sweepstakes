const router = require('express').Router()

const queries = require('../db/fixture_queries.js')

router.get('/:tournament_id/fixtures/:fixture_id', (req, res, next) => {
  queries.fixtureById(req.params.tournament_id, req.params.fixture_id)
    .then((fixtures) => {
      res.status(200).json(fixtures)
    })
    .catch((error) => {
      next(error)
    })
})

router.get('/:tournament_id/fixtures', (req, res, next) => {
  queries.allFixtures(req.params.tournament_id)
    .then((fixtures) => {
      res.status(200).json(fixtures)
    })
    .catch((error) => {
      next(error)
    })
})

module.exports = router
