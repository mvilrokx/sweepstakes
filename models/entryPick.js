const bookshelf = require('../db/bookshelf')

require('./user.js')
require('./userEntry.js')
require('./tournamentParticipant.js')

const EntryPick = bookshelf.Model.extend({
  tableName: 'entry_picks',
  hasTimestamps: true,
  user: function () {
    return this.belongsTo('User')
  },
  entry: function () {
    return this.belongsTo('UserEntry')
  },
  tournamentParticipant: function () {
    return this.belongsTo('TournamentParticipant')
  }
})

module.exports = bookshelf.model('EntryPick', EntryPick)
