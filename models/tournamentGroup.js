const bookshelf = require('../db/bookshelf')

require('./tournament.js')
require('./tournamentParticipant.js')

const TournamentGroup = bookshelf.Model.extend({
  tableName: 'tournament_groups',
  tournament: function () {return this.belongsTo('Tournament') },
  participants: function () {return this.hasMany('TournamentParticipant')}
})

module.exports = bookshelf.model('TournamentGroup', TournamentGroup)
