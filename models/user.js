const bookshelf = require('../db/bookshelf')

require('./userEntry.js')

const User = bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  hidden: ['password'],
  entries: function () {
    return this.hasMany('UserEntry')
  }
})

module.exports = bookshelf.model('User', User)
