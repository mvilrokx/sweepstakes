const bookshelf = require('../db/bookshelf')

require('./tournamentParticipant.js')

const Country = bookshelf.Model.extend({
  tableName: 'countries',
  participants: function () {
    return this.hasMany('TournamentParticipant')
  },
  virtuals: {
    flag_url: function () {
      let flagCode = this.get('code')
      // To account for these not being real countries
      if (['EL', 'ND', 'OL', 'WL'].includes(flagCode)) {flagCode = 'GB'}
      return `http://www.geonames.org/flags/x/${flagCode.toLowerCase()}.gif`
    }
  }
})

module.exports = bookshelf.model('Country', Country)
