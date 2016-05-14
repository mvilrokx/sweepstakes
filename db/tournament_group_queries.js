const knex = require('./knex.js')

const tournamentGroups = (tournament_id) => {
  return knex.select(
    'tournament_groups.id as group_id',
    'tournament_groups.finished',
    'tournament_groups.name as group_name',
    'tournaments.name as tournament_name',
    'tournament_participants.country_code',
    'countries.name as country_name',
    'tournament_participants.id as tournament_participant_id'
  )
    .from('tournament_groups', 'tournaments', 'tournament_participants', 'countries')
    .join('tournaments', 'tournament_groups.tournament_id', 'tournaments.id')
    .join('tournament_participants', 'tournament_participants.group_id', 'tournament_groups.id')
    .join('countries', 'tournament_participants.country_code', 'countries.isoAlpha3')
    .where({'tournament_groups.tournament_id': tournament_id})
}

module.exports = {tournamentGroups}
