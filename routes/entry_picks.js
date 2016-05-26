const router = require('express').Router()

const userEntriesQueries = require('../db/user_entries_queries.js')
const tournamentGroupQueries = require('../db/tournament_group_queries.js')
const entryPickQueries = require('../db/entry_pick_queries.js')

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next()
  res.redirect('/users/login')
}

/***
*  CREATE a new Entry Pick
*/
router.get('/:entry_id/picks/new', isLoggedIn, (req, res, next) => {

  userEntriesQueries.getUserEntry(req.user, req.params.entry_id)
    .then((userEntry) => {
      // console.log('userEntry', userEntry)
      tournamentGroupQueries.tournamentGroups(userEntry[0].tournament_id)
        .then((tournamentGroups) => {
          // console.log('tournamentGroups', tournamentGroups)
          // TODO: Filter out already selected countries as we don't want the user to select the same team twice in his picks (for the same entry)
          entryPickQueries.getEntryPicks(req.user, req.params.entry_id)
            .then((picks) => {
              // console.log('picks', picks)
              res.render('new_pick', {
                isLoggedIn: req.isAuthenticated(),
                user: req.user, tournamentGroups: tournamentGroups,
                entry: userEntry[0],
                existing_picks: picks,
                position: req.query.position
              })
            })
        })
    })
    .catch((error) => {
      next(error)
    })
})

/***
*  SAVE a new Entry Pick
*/
router.post('/:entry_id/picks', isLoggedIn, (req, res, next) => {
  entryPickQueries.insertEntryPick({
    user: req.user,
    entry_id: req.params.entry_id,
    tournament_participant_id: req.body.participant_id,
    position: req.body.position
  })
    .then(() => {
      res.redirect(`/entries/${req.params.entry_id}`)
    })
    .catch((error) => {
      next(error)
    })
})

/***
*  DELETE an Entry Pick
*/
router.delete('/:entry_id/picks/:pick_id', isLoggedIn, (req, res, next) => {
  entryPickQueries.deleteEntryPick(req.user, req.params.pick_id)
    .then(() => {
      res.redirect(`/entries/${req.params.entry_id}`)
    })
    .catch((error) => {
      next(error)
    })
})

module.exports = router
