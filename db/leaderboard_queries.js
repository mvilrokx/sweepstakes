const knex = require('./knex.js')

const tournamentEntries = (tournament_id) => {
  return knex.select(
    'users.id as user_id',
    'user_entries.id as user_entry_id',
    'tournaments.name as tournament_name',
    'users.email',
    'user_entries.name as user_entry_name',
    'user_entries.paid',
    'entry_picks.position',
    'tournament_participants.country_code'
  )
    .from('user_entries', 'tournaments', 'users', 'entry_picks')
    .where({'user_entries.tournament_id': tournament_id})
    .join('tournaments', 'user_entries.tournament_id', 'tournaments.id')
    .join('users', 'user_entries.user_id', 'users.id')
    .join('entry_picks', 'user_entries.id', 'entry_picks.user_entry_id')
    .join('tournament_participants', 'entry_picks.tournament_participant_id', 'tournament_participants.id')
}

module.exports = {tournamentEntries}
