const bookshelf = require('../db/bookshelf')

require('./tournament.js')
require('./tournamentGroup.js')
require('./country.js')
require('./fixture.js')

const TournamentParticipant = bookshelf.Model.extend({
  tableName: 'tournament_participants',
  tournament() {return this.belongsTo('Tournament') },
  group() {return this.belongsTo('Group') },
  country() {return this.belongsTo('Country') },
  homeTeams() {return this.hasMany('Fixture', 'home')},
  awayTeams() {return this.hasMany('Fixture', 'away')}
})

module.exports = bookshelf.model('TournamentParticipant', TournamentParticipant)
