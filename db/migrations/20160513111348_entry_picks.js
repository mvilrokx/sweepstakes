exports.up = (knex, Promise) => {
  return knex.schema.createTable('entry_picks', (table) => {
    table.increments()
    table.integer('user_id').references('users.id').notNullable().onDelete('CASCADE')
    table.integer('user_entry_id').references('user_entries.id').notNullable().onDelete('CASCADE')
    table.integer('tournament_participant_id').references('tournament_participants.id').notNullable().onDelete('CASCADE')
    table.integer('position').notNullable()
    table.timestamps()
    table.unique(['user_entry_id', 'position']) // All positions in an entry have to be unique
    table.unique(['user_entry_id', 'tournament_participant_id']) // No country can be used twice in an entry
  }).raw('ALTER TABLE entry_picks ADD CONSTRAINT max_positions CHECK ("position" < 9)')
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('entry_picks')
}
