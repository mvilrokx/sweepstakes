const router = require('express').Router()

const queries = require('../db/tournament_group_queries.js')

const transformGroups = (tournament_groups) => {
  let groups = {}
  tournament_groups.forEach((group) => {
    if (!groups[group.group_name]) groups[group.group_name] = {}
    if (!groups[group.group_name].members) {
      groups[group.group_name].members = []
      groups[group.group_name].finished = group.finished
    }
    groups[group.group_name].members.push(group.country_code)
  })
  return groups
}

router.get('/:tournament_id/groups', (req, res, next) => {
  queries.tournamentGroups(req.params.tournament_id)
    .then((tournament_groups) => {
      console.log(tournament_groups)
      res.status(200).json(transformGroups(tournament_groups))
    })
    .catch((error) => {
      next(error)
    })
})

module.exports = router
