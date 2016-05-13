exports.up = (knex, Promise) => {
  return knex.schema.createTable('user_entries', (table) => {
    table.increments()
    table.string('name').notNullable().unique()
    table.integer('user_id').references('users.id').notNullable()
    table.integer('tournament_id').references('tournaments.id').notNullable()
    table.boolean('paid').notNullable().defaultTo(false)
    table.timestamps()
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('user_entries')
}
