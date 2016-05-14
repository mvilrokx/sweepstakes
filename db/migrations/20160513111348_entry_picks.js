exports.up = (knex, Promise) => {
  return knex.schema.createTable('entry_picks', (table) => {
    table.increments()
    table.integer('user_id').references('users.id').notNullable().onDelete('CASCADE')
    table.integer('user_entry_id').references('user_entries.id').notNullable().onDelete('CASCADE')
    table.integer('tournament_participant_id').references('tournament_participants.id').notNullable().onDelete('CASCADE')
    table.integer('position')
    table.timestamps()
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('entry_picks')
}
