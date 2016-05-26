const router = require('express').Router()

const Tournament = require('../models/tournament.js')

// TODO: Add this to the model somehow
// const addChildUrl = (tournaments, req) => {
//   tournaments.forEach((tournament) => {
//     tournament.groups_url = `${req.protocol}://${req.get('host')}/tournaments/${tournament.id}/groups`
//     tournament.fixtures_url = `${req.protocol}://${req.get('host')}/tournaments/${tournament.id}/fixtures`
//   })
//   return tournaments
// }

router.get('/:tournament_id', (req, res, next) => {
  new Tournament({id: req.params.tournament_id}).fetch()
    .then((tournament) => {
      // res.status(200).json(addChildUrl([tournaments.toJSON()], req)[0])
      res.status(200).json(tournament.toJSON())
    })
    .catch((err) => {
      next(err)
    })
})

router.get('/', (req, res, next) => {
  new Tournament().fetchAll()
    .then((tournaments) => {
      // res.status(200).json(addChildUrl(tournaments.toJSON(), req))
      res.status(200).json(tournaments.toJSON())
    })
    .catch((err) => {
      next(err)
    })
})

module.exports = router
