const euro2016 = require('../seed_data/euro2016.js')
const copa2016 = require('../seed_data/copa2016.js')
const fifa2018 = require('../seed_data/fifa2018.js')

const insertTournament = (knex, Promise, tournament) => {
  return knex('tournaments')
    .returning('id')
    .insert({
      name: tournament.name,
      hosts: tournament.hosts,
      starts_at: tournament.starts_at,
      ends_at: tournament.ends_at
    })
    .then(tournament_id => {
      console.log(`Successfully inserted Tournamanet ${tournament.name}`)
      return Promise.map(Object.keys(tournament.groups), groupName => {
        return knex('tournament_groups')
          .returning('id')
          .insert({
            name: groupName,
            tournament_id: tournament_id[0]
          })
          .then(group_id => {
            console.log(
              `Successfully inserted Group ${groupName} into Tournament ${
                tournament.name
              }`
            )
            return Promise.map(tournament.groups[groupName], participant => {
              console.log(
                `Successfully inserted Participant ${participant} into Group ${groupName}`
              )
              return knex('tournament_participants')
                .insert({
                  country_id: participant,
                  group_id: group_id[0],
                  tournament_id: tournament_id[0]
                })
                .catch(error => {
                  if (
                    error.code === '23505' &&
                    error.constraint ===
                      'tournament_participants_tournament_id_country_id_unique'
                  ) {
                    console.log(
                      `Participant ${participant} already exists for Tournament ${
                        tournament.name
                      }`
                    )
                  } else {
                    console.log('error', error)
                  }
                })
            })
          })
          .catch(error => {
            if (
              error.code === '23505' &&
              error.constraint === 'uniqueTournamentGroup'
            ) {
              console.log(`Group ${groupName} already exists`)
            } else {
              console.log('error', error)
            }
          })
      })
    })
    .catch(error => {
      // TODO: This should still trigger inserting Groups and then participants
      if (
        error.code === '23505' &&
        error.constraint === 'tournaments_name_unique'
      ) {
        console.log(`Tournament ${tournament.name} already exists`)
      } else {
        console.log('error', error)
      }
    })
}

exports.seed = (knex, Promise) => {
  return Promise.join(
    insertTournament(knex, Promise, euro2016),
    insertTournament(knex, Promise, copa2016),
    insertTournament(knex, Promise, fifa2018)
  )
}
