exports.up = (knex, Promise) => {
  return knex.schema.createTable('tournament_groups', (table) => {
    table.increments()
    table.string('name', 3).notNullable()
    table.integer('tournament_id').references('tournaments.id')
    table.boolean('finished').notNullable().defaultTo(false)
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('tournament_groups')
}
