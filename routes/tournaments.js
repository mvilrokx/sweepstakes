const express = require('express')
const router = express.Router()

const queries = require('../db/tournament_queries.js')

const addChildUrl = (tournaments, req) => {
  tournaments.forEach((tournament) => {
    tournament.groups_url = `${req.protocol}://${req.get('host')}/tournaments/${tournament.id}/groups`
    tournament.fixtures_url = `${req.protocol}://${req.get('host')}/tournaments/${tournament.id}/fixtures`
  })
  return tournaments
}

router.get('/:tournament_id', (req, res, next) => {
  queries.tournamentById(req.params.tournament_id)
    .then((tournaments) => {
      res.status(200).json(addChildUrl(tournaments, req)[0])
    })
    .catch((error) => {
      next(error)
    })
})

router.get('/', (req, res, next) => {
  queries.allTournaments()
    .then((tournaments) => {
      res.status(200).json(addChildUrl(tournaments, req))
    })
    .catch((error) => {
      next(error)
    })
})

module.exports = router
