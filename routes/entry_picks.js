const router = require('express').Router()

const EntryPick = require('../models/entryPick.js')
const UserEntry = require('../models/userEntry.js')

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next()
  res.redirect('/users/login')
}

/***
*  CREATE a new Entry Pick
*/
router.get('/:entry_id/picks/new', isLoggedIn, (req, res, next) => {
  new UserEntry({ user_id: req.user.id, id: req.params.entry_id})
    .fetch({withRelated: [
        'picks',
        'picks.tournamentParticipant',
        'picks.tournamentParticipant.country',
        'tournament',
        'tournament.participants',
        'tournament.participants.country'
    ]})
    .then((userEntry) => {
      res.render('new_pick', {
        isLoggedIn: req.isAuthenticated(),
        user: req.user,
        entry: userEntry.toJSON(),
        position: req.query.position
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
  new EntryPick({
    user_id: req.user.id,
    user_entry_id: req.params.entry_id,
    tournament_participant_id: req.body.participant_id,
    position: req.body.position
  }).save()
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
  new EntryPick({user_id: req.user.id, id: req.params.pick_id}).destroy()
    .then(() => {
      res.redirect(`/entries/${req.params.entry_id}`)
    })
    .catch((error) => {
      next(error)
    })
})

module.exports = router
