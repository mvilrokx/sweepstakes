const knex = require('./knex.js')

const fixtures = (tournament_id) => {
  return knex('fixtures').where({'fixtures.tournament_id': tournament_id})
}

const allFixtures = (tournament_id) => {
  return fixtures(tournament_id)
    .join('tournament_participants as home', 'fixtures.home', 'home.id')
    .join('tournament_participants as away', 'fixtures.away', 'away.id')
    .select('fixtures.id', 'fixtures.kickoff', 'home.country_code as home', 'away.country_code as away', 'fixtures.result')
}

const fixtureById = (tournament_id, id) => {
  return allFixtures(tournament_id).where({'fixtures.id': id})
}

module.exports = {allFixtures, fixtureById}
