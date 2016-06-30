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
  },
  initialize: function () {
    this.on('saving', this.beforeSave)
    this.on('destroying', this.beforeSave)
  },
  beforeSave: function () {
    return this.entry().fetch()
      .then((entry) => {
        return entry.tournament().fetch()
          .then((tournament) => {
            if (tournament.get('hasStarted')) {
              throw new Error('Tournament already started, changes not allowed.')
            }
          })
      })
  }
})

module.exports = bookshelf.model('EntryPick', EntryPick)
