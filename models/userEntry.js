// TODO: This should really be all in the model, but I didn't know how to do that so left it here for now
const bookshelf = require('../db/bookshelf')

require('./tournament.js')
require('./user.js')
require('./entryPick.js')

const UserEntry = bookshelf.Model.extend({
  tableName: 'user_entries',
  hasTimestamps: true,
  tournament: function () {
    return this.belongsTo('Tournament')
  },
  user: function () {
    return this.belongsTo('User')
  },
  picks: function () {
    return this.hasMany('EntryPick')
  },
  initialize: function () {
    this.on('saving', this.beforeSave)
    this.on('destroying', this.beforeSave)
  },
  beforeSave: function () {
    return this.tournament().fetch().then(function (tournament) {
      if (tournament.get('starts_at') < new Date()) {
        throw new Error('Tournament already started, changes not allowed.')
      }
    })
  }
})

module.exports = bookshelf.model('UserEntry', UserEntry)
