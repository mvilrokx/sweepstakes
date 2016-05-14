exports.up = (knex, Promise) => {
  return knex.schema.createTable('countries', (table) => {
    table.string('isoAlpha3', 3).primary()
    table.string('code', 2).notNullable().unique()
    table.string('name').notNullable().unique()
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('countries')
}
