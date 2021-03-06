const router = require('express').Router()

const Fixture = require('../models/fixture.js')
const TournamentParticipant = require('../models/tournamentParticipant.js')
const Tournament = require('../models/tournament.js')

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('leaderboard', {
    bodyClasses: 'bg-green',
    title: 'Leaderboard'
  })
})

router.get('/:tournament_id', (req, res, next) => {
  new Tournament({id: req.params.tournament_id})
    .fetch({withRelated: [
        'entries',
        'entries.picks',
        'entries.user',
        'entries.picks.tournamentParticipant',
        'entries.picks.tournamentParticipant.country',
        'entries.picks.tournamentParticipant.homeTeams',
        'entries.picks.tournamentParticipant.awayTeams'
      ]
    })
    .then((tournament) => {
      let tourny = tournament.toJSON()
      // Calculate points for each entry
      tourny.entries.forEach((entry, i) => {
        let totalPoints = 0
        entry.picks.forEach((pick) => {
          let homeGamePoints = 0
          pick.tournamentParticipant.homeTeams.forEach((homeGame) => {
            homeGamePoints = homeGamePoints + homeGame.homeTeamPoints
          })
          let awayGamePoints = 0
          pick.tournamentParticipant.awayTeams.forEach((awayGame) => {
            awayGamePoints = awayGamePoints + awayGame.awayTeamPoints
          })
          totalPoints = totalPoints + ((homeGamePoints + awayGamePoints) * (9 - pick.position))
        })
        tourny.entries[i].totalPoints = totalPoints
      })
      // res.status(200).json(tourny)
      res.render('leaderboard', {isLoggedIn: req.isAuthenticated(), user: req.user, tournament: tourny})
    })
    .catch((err) => {
      next(err)
    })
})

module.exports = router
