const router = require('express').Router()

const Tournament = require('../models/tournament.js')
const Fixture = require('../models/fixture.js')
const User = require('../models/user.js')

// route middleware to make sure a user is logged in
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next()
  res.redirect('/')
}

router.get('/:tournament_id/fixtures/:fixture_id', (req, res, next) => {
  new Fixture({tournament_id: req.params.tournament_id, id: req.params.fixture_id})
    .fetch({
      withRelated: ['home', 'away', 'home.country', 'away.country']
    })
    .then((fixture) => {
      res.render('update_fixture', {isLoggedIn: req.isAuthenticated(), user: req.user, fixture: fixture.toJSON()})
    // res.status(200).json(fixture.toJSON())
    })
    .catch((error) => {
      next(error)
    })
})

/***
*  UPDATE fixture (only Admins can do this and you can only update the result)
*/
router.put('/:tournament_id/fixtures/:fixture_id', isLoggedIn, (req, res, next) => {
  if (req.user.admin) {
    new Fixture({tournament_id: req.params.tournament_id, id: req.params.fixture_id})
      .save({result: {
          homeGoals: parseInt(req.body.home_goals, 10),
          awayGoals: parseInt(req.body.away_goals, 10),
          homePenalties: parseInt(req.body.home_penalties, 10),
          awayPenalties: parseInt(req.body.away_penalties, 10),
          groupStage: (req.body.group_stage && req.body.group_stage === 'true') ? true : false,
      }})
      .then((entry) => {
        res.redirect(`/tournaments/${req.params.tournament_id}/fixtures`)
      })
      .catch((error) => {
        next(error)
      })
  } else { // TODO: This is in case you are not an Admin, needs a flash message or sometjhinig
    res.redirect(`/tournaments/${req.params.tournament_id}/fixtures`)
  }
})

router.get('/:tournament_id/fixtures', (req, res, next) => {
  new Tournament().query({where: {id: req.params.tournament_id}})
    .fetch({
      withRelated: ['fixtures', 'fixtures.home', 'fixtures.away', 'fixtures.home.country', 'fixtures.away.country']
    })
    .then((tournament) => {
      res.render('fixtures', {isLoggedIn: req.isAuthenticated(), user: req.user, tournament: tournament.toJSON()})
    // res.status(200).json(tournament.toJSON())
    })
    .catch((error) => {
      next(error)
    })
})

module.exports = router
