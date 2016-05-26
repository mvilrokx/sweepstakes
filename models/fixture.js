const bookshelf = require('../db/bookshelf')

require('./tournament.js')
require('./tournamentParticipant.js')

const calculatePoints = (results, home) => {
  if (!results) return 0

  let points = 0
  let myGoals = 0
  let otherGoals = 0
  let myPenalties = 0
  let otherPenalties = 0

  if (home) {
    myGoals = results.homeGoals
    otherGoals = results.awayGoals
    myPenalties = results.homePenalties
    otherPenalties = results.awayPenalties
  } else {
    myGoals = results.awayGoals
    otherGoals = results.homeGoals
    myPenalties = results.awayPenalties
    otherPenalties = results.homePenalties
  }

  // Each time one of your teams scores a goal, they score 1 point for you.
  points = points + myGoals
  // Each win scores 3 points for you.
  if (myGoals > otherGoals) points = points + 3
  // In the group stage, a draw earns 1 point for you.
  if (results.groupStage) {
    if (myGoals === otherGoals) points = points + 1
  } else { // there are no draws in the elimination round
    if (myGoals === otherGoals) { // so there must have been a penalty shootout
      if (myPenalties > otherPenalties) points = points + 3
    }
  }
  return points
}

const Fixture = bookshelf.Model.extend({
  tableName: 'fixtures',
  tournament: function () {return this.belongsTo('Tournament') },
  home: function () {return this.belongsTo('TournamentParticipant') },
  away: function () {return this.belongsTo('TournamentParticipant') },
  virtuals: {
    homeTeamPoints: function () {return calculatePoints(this.get('result'), true) },
    awayTeamPoints: function () {return calculatePoints(this.get('result'), false) }
  }
})

module.exports = bookshelf.model('Fixture', Fixture)
