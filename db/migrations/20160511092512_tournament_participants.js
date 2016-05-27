exports.up = (knex, Promise) => {
  return knex.schema.createTable('tournament_participants', (table) => {
    table.increments()
    table.integer('tournament_id').references('tournaments.id')
    table.integer('group_id').references('tournament_groups.id')
    table.string('country_id', 3).references('countries.id')
    table.unique(['tournament_id', 'country_id']) // A country can only participate once in a tournament
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('tournament_participants')
}
