const bookshelf = require('../db/bookshelf')

require('./tournament.js')
require('./user.js')
require('./entryPick.js')

const UserEntry = bookshelf.Model.extend({
  tableName: 'user_entries',
  hasTimestamps: true,
  tournament: function () {
    return this.belongsTo('Tournament', 'tournament_id')
  },
  user: function () {
    return this.belongsTo('User', 'user_id')
  },
  picks: function () {
    return this.hasMany('EntryPick')
  }
})

module.exports = bookshelf.model('UserEntry', UserEntry)
