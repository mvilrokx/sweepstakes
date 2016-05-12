exports.up = (knex, Promise) => {
  return knex.schema.createTable('countries', (table) => {
    table.string('code', 3).primary()
    table.string('name').notNullable().unique()
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('countries')
}
