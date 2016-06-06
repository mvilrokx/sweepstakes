const bookshelf = require('../db/bookshelf')

require('./user.js')
require('./userEntry.js')
require('./tournamentParticipant.js')

const EntryPick = bookshelf.Model.extend({
  tableName: 'entry_picks',
  hasTimestamps: true,
  user() {
    return this.belongsTo('User')
  },
  entry() {
    return this.belongsTo('UserEntry')
  },
  tournamentParticipant() {
    return this.belongsTo('TournamentParticipant')
  },
  initialize() {
    this.on('saving', this.beforeSave)
    this.on('destroying', this.beforeSave)
  },
  beforeSave() {
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
