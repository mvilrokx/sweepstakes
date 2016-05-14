exports.up = (knex, Promise) => {
  return knex.schema.createTable('tournament_participants', (table) => {
    table.increments()
    table.integer('tournament_id').references('tournaments.id')
    table.integer('group_id').references('tournament_groups.id')
    table.string('country_code', 3).references('countries.isoAlpha3')
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('tournament_participants')
}
