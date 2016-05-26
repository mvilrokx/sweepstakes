const bookshelf = require('../db/bookshelf')

require('./tournamentParticipant.js')

const Country = bookshelf.Model.extend({
  tableName: 'countries',
  participants: function () {
    return this.hasMany('TournamentParticipant')
  }
})

module.exports = bookshelf.model('Country', Country)
