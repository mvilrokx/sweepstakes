const euro2016 = require('../seed_data/euro2016.js')
const copa2016 = require('../seed_data/copa2016.js')

const insertTournament = (knex, Promise, tournament) => {
  return knex('tournaments').returning('id').insert({
    name: tournament.name,
    hosts: tournament.hosts,
    starts_at: tournament.starts_at,
    ends_at: tournament.ends_at
  }).then((tournament_id) => {
    return Promise.map(Object.keys(tournament.groups), (groupName) => {
      return knex('tournament_groups').returning('id').insert({
        name: groupName,
        tournament_id: tournament_id[0]
      }).then((group_id) => {
        return Promise.map(tournament.groups[groupName], (participant) => {
          return knex('tournament_participants').insert({
            country_code: participant,
            group_id: group_id[0],
            tournament_id: tournament_id[0]
          })
        })
      })
    })
  })
}

exports.seed = (knex, Promise) => {

  return knex('tournaments').del()
    .then(() => {
      return Promise.join(
        insertTournament(knex, Promise, euro2016),
        insertTournament(knex, Promise, copa2016)
      )
    })
    .catch((error) => {
      console.log(error)
    })
}
