exports.up = (knex, Promise) => {
  return knex.schema.createTable('tournament_groups', (table) => {
    table.increments()
    table.string('name', 3).notNullable()
    table.integer('tournament_id').references('tournaments.id')
    table.boolean('finished').notNullable().defaultTo(false)
    table.unique(['tournament_id', 'name'], 'uniqueTournamentGroup') // A group can only exist once in a tournament
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('tournament_groups')
}
