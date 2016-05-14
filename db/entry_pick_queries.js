const knex = require('./knex.js')

const entryPicks = () => {
  return knex('entry_picks')
}

const getEntryPicks = (user, user_entry_id) => {
  console.log('user', user)
  console.log('user_entry_id', user_entry_id)
  return entryPicks()
    .select(
      'entry_picks.id as pick_id',
      'tournament_participants.country_code',
      'countries.code as flag_code',
      'countries.name as country_name',
      knex.raw("'http://www.geonames.org/flags/x/' || lower(countries.code) || '.gif'  as flag_url"))
    .where({user_id: user.id, user_entry_id: user_entry_id})
    .join('tournament_participants', 'entry_picks.tournament_participant_id', 'tournament_participants.id')
    .join('countries', 'tournament_participants.country_code', 'countries.isoAlpha3')
}

const insertEntryPick = (pick) => {
  console.log('pick', pick)
  return entryPicks().insert({
    user_id: pick.user.id,
    user_entry_id: pick.entry_id,
    tournament_participant_id: pick.tournament_participant_id,
    created_at: knex.fn.now(),
    updated_at: knex.fn.now()
  })
}

const deleteEntryPick = (user, pick_id) => {
  return entryPicks().del().where({id: pick_id, user_id: user.id})
}

module.exports = {getEntryPicks, insertEntryPick, deleteEntryPick}
