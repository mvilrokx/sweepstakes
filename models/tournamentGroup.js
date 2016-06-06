const bookshelf = require('../db/bookshelf')

require('./tournament.js')
require('./tournamentParticipant.js')

const TournamentGroup = bookshelf.Model.extend({
  tableName: 'tournament_groups',
  tournament() {return this.belongsTo('Tournament') },
  participants() {return this.hasMany('TournamentParticipant')}
})

module.exports = bookshelf.model('TournamentGroup', TournamentGroup)
