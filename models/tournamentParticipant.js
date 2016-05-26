const bookshelf = require('../db/bookshelf')
const Promise = require('bluebird')
const _ = require('lodash')

require('./tournament.js')
require('./tournamentGroup.js')
require('./country.js')
require('./fixture.js')

// const calculatePoints = (homeTeams, awayTeams) => {
//   let points = 0
//   return new Promise(function (resolve, reject) {
//     homeTeams.fetch()
//       .then((homeTeams) => {
//         homeTeams.forEach((homeTeam) => {
//           points = points + homeTeam.homeTeamPoints
//         })
//       })
//       .then(() => {
//         awayTeams.fetch()
//           .then((awayTeams) => {
//             awayTeams.forEach((awayTeam) => {
//               points = points + awayTeam.awayTeamPoints
//             })
//             console.log('points', points)
//             resolve(points)
//           })
//       })
//   })
// }

const TournamentParticipant = bookshelf.Model.extend({
  tableName: 'tournament_participants',
  tournament: function () {return this.belongsTo('Tournament') },
  group: function () {return this.belongsTo('Group') },
  country: function () {return this.belongsTo('Country') },
  homeTeams: function () {return this.hasMany('Fixture', 'home')},
  awayTeams: function () {return this.hasMany('Fixture', 'away')}
})

module.exports = bookshelf.model('TournamentParticipant', TournamentParticipant)
