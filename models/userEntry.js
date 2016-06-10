// TODO: This should really be all in the model, but I didn't know how to do that so left it here for now
const bookshelf = require('../db/bookshelf')

require('./tournament.js')
require('./user.js')
require('./entryPick.js')

const UserEntry = bookshelf.Model.extend({
  tableName: 'user_entries',
  hasTimestamps: true,
  tournament() {
    return this.belongsTo('Tournament')
  },
  user() {
    return this.belongsTo('User')
  },
  picks() {
    return this.hasMany('EntryPick')
  },
  initialize() {
    this.on('saving', this.beforeSave)
    this.on('destroying', this.beforeSave)
  },
  beforeSave() {
    return this.tournament().fetch().then((tournament) => {
      if (tournament.get('hasStarted')) {
        throw new Error('Tournament already started, changes not allowed.')
      }
    })
  }
})

module.exports = bookshelf.model('UserEntry', UserEntry)
