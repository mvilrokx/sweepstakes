const bookshelf = require('../db/bookshelf')

require('./tournamentGroup.js')
require('./userEntry.js')
require('./fixture.js')
require('./tournamentParticipant.js')

const Tournament = bookshelf.Model.extend({
  tableName: 'tournaments',
  groups: function () {
    return this.hasMany('Group')
  },
  entries: function () {
    return this.hasMany('UserEntry', 'tournament_id')
  },
  fixtures: function () {
    return this.hasMany('Fixture')
  },
  participants: function () {
    return this.hasMany('TournamentParticipant')
  },
  virtuals: {
    hasStarted: function () {return this.get('starts_at') < new Date()}
  }
})

module.exports = bookshelf.model('Tournament', Tournament)
