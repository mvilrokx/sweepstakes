const bookshelf = require('../db/bookshelf')

require('./tournamentGroup.js')
require('./userEntry.js')
require('./fixture.js')
require('./tournamentParticipant.js')

const Tournament = bookshelf.Model.extend({
  tableName: 'tournaments',
  groups() {
    return this.hasMany('Group')
  },
  entries() {
    return this.hasMany('UserEntry', 'tournament_id')
  },
  fixtures() {
    return this.hasMany('Fixture')
  },
  participants() {
    return this.hasMany('TournamentParticipant')
  },
  virtuals: {
    // TODO: REMOVE HACK!
    // hasStarted() {return this.get('starts_at') < new Date()}
    hasStarted() {
      if (this.get('name') === 'EURO 2016') {
        return false
      } else
        return true
    }
  }
})

module.exports = bookshelf.model('Tournament', Tournament)
