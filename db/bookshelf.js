const knex = require('./knex.js')

const bookshelf = require('bookshelf')(knex)

bookshelf.plugin('visibility')
bookshelf.plugin('registry')
bookshelf.plugin('virtuals')

module.exports = bookshelf
