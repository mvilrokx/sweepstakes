const bookshelf = require('../db/bookshelf')

require('./tournamentParticipant.js')

const Country = bookshelf.Model.extend({
  tableName: 'countries',
  participants: function () {
    return this.hasMany('TournamentParticipant')
  },
  virtuals: {
    flag_url: function () {
      return `http://www.geonames.org/flags/x/${this.get('code').toLowerCase()}.gif`
    }
  }
})

module.exports = bookshelf.model('Country', Country)
