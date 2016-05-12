exports.up = (knex, Promise) => {
  return knex.schema.createTable('fixtures', (table) => {
    table.increments()
    table.integer('tournament_id').references('tournaments.id')
    table.integer('home').references('tournament_participants.id').notNullable()
    table.integer('away').references('tournament_participants.id').notNullable()
    table.timestamp('kickoff').notNullable()
    table.json('result')
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('fixtures')
}
