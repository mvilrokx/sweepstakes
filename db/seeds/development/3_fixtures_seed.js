const fixtures = require('../seed_data/fixtures.js')

// TODO: Make this re-runable.  As it stands, this will wipe out all existing entries which would be bad when I need to start adding QF , SF and Final games.  Look at https://github.com/mvilrokx/sweepstakez/blob/master/db/seeds.rb for inspiration
exports.seed = (knex, Promise) => {
  return knex('fixtures').del()
    .then(() => {
      return Promise.map(fixtures, (tournament) => {
        return knex.select('id').from('tournaments').where({name: tournament.tournament_name})
          .then((tournament_id) => {
            return Promise.map(tournament.fixtures, (fixture) => {
              return Promise.join(
                knex.select('id').from('tournament_participants').where({country_code: fixture.home, tournament_id: tournament_id[0].id}),
                knex.select('id').from('tournament_participants').where({country_code: fixture.away, tournament_id: tournament_id[0].id})
              )
                .then((teams) => {
                  return knex('fixtures').insert({
                    tournament_id: tournament_id[0].id,
                    kickoff: fixture.kickoff,
                    home: teams[0][0].id,
                    away: teams[1][0].id
                  })
                })
            })
          })
      })
    })
    .catch((error) => {
      console.log(error)
    })
}
