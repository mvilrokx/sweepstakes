const knex = require('./knex.js')

const tournamentGroups = (tournament_id) => {
  return knex.select(
    'tournament_groups.id as group_id',
    'tournament_groups.finished',
    'tournament_groups.name as group_name',
    'tournaments.name as tournament_name',
    'tournament_participants.country_code'
  )
    .from('tournament_groups', 'tournaments', 'tournament_participants')
    .join('tournaments', 'tournament_groups.tournament_id', 'tournaments.id')
    .join('tournament_participants', 'tournament_participants.group_id', 'tournament_groups.id')
    .where({'tournament_groups.tournament_id': tournament_id})
}

module.exports = {tournamentGroups}
