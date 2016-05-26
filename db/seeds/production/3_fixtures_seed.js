const fixtures = require('../seed_data/fixtures.js')

exports.seed = (knex, Promise) => {
  return Promise.map(fixtures, (tournament) => {
    return knex.select('id').from('tournaments').where({name: tournament.tournament_name})
      .then((tournament_id) => {
        return Promise.map(tournament.fixtures, (fixture) => {
          return Promise.join(
            knex.select('id').from('tournament_participants').where({country_code: fixture.home, tournament_id: tournament_id[0].id}),
            knex.select('id').from('tournament_participants').where({country_code: fixture.away, tournament_id: tournament_id[0].id})
          )
            .then((teams) => {
              return knex('fixtures').returning('id').insert({
                tournament_id: tournament_id[0].id,
                kickoff: fixture.kickoff,
                home: teams[0][0].id,
                away: teams[1][0].id
              }).then((id) => {
                console.log(`Successfully inserted Fixture ${fixture.home} - ${fixture.away} on ${fixture.kickoff}`)
              })
            }).catch((error) => {
            if (error.code === '23505' && error.constraint === 'uniqueFixture') {
              console.log(`Fixture ${fixture.home} - ${fixture.away} on ${fixture.kickoff} already exists`)
            } else {
              console.log('error', error)
            }
          })
        })
      })
  })
}
