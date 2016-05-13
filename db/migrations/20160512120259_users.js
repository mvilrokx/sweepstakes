exports.up = (knex, Promise) => {
  return knex.schema.createTable('users', (table) => {
    table.increments()
    // table.string('username').notNullable().unique()
    table.string('password').notNullable()
    table.string('email').notNullable().unique()
    table.timestamps()
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('users')
}
