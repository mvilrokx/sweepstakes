const knex = require('./knex.js')

const userEntries = () => {
  return knex('user_entries')
}

const getUserEntry = (user, entry_id) => {
  return userEntries().select(
    'tournaments.id as tournament_id',
    'tournaments.name as tournament_name',
    'user_entries.id as user_entry_id',
    'user_entries.name as user_entry_name'
  )
    .where({'user_entries.id': entry_id, 'user_entries.user_id': user.id})
    .join('tournaments', 'user_entries.tournament_id', 'tournaments.id')
}

const getUserEntries = (user) => {
  return knex.select(
    'tournaments.name as tournament_name',
    'user_entries.id as user_entry_id',
    'user_entries.name as user_entry_name'
  )
    .from('user_entries').where({user_id: user.id})
    .join('tournaments', 'user_entries.tournament_id', 'tournaments.id')
}

const deleteUserEntry = (user, entry_id) => {
  return userEntries().del().where({id: entry_id, user_id: user.id})
}

const updateUserEntry = (user, entry_id, name) => {
  return userEntries().update({name}).where({id: entry_id, user_id: user.id})
}

const insertUserEntry = (entry) => {
  return userEntries().insert({
    name: entry.name,
    user_id: entry.user.id,
    tournament_id: entry.tournament_id,
    created_at: knex.fn.now(),
    updated_at: knex.fn.now()
  })
}

module.exports = {getUserEntry, getUserEntries, deleteUserEntry, insertUserEntry, updateUserEntry}
