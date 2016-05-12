exports.up = (knex, Promise) => {
  return knex.schema.createTable('tournaments', (table) => {
    table.increments()
    table.string('name').notNullable().unique()
    table.specificType('hosts', 'text[]')
    table.timestamp('starts_at')
    table.timestamp('ends_at')
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('tournaments')
}
