const bookshelf = require('../db/bookshelf')

require('./tournament.js')
require('./tournamentGroup.js')
require('./country.js')
require('./fixture.js')

const TournamentParticipant = bookshelf.Model.extend({
  tableName: 'tournament_participants',
  tournament: function () {return this.belongsTo('Tournament') },
  group: function () {return this.belongsTo('Group') },
  country: function () {return this.belongsTo('Country') },
  homeTeams: function () {return this.hasMany('Fixture', 'home')},
  awayTeams: function () {return this.hasMany('Fixture', 'away')}
})

module.exports = bookshelf.model('TournamentParticipant', TournamentParticipant)
