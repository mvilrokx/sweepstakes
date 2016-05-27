const router = require('express').Router()

const Tournament = require('../models/tournament.js') // needed for LOV
const UserEntry = require('../models/userEntry.js')

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next()
  res.redirect('/users/login')
}

/***
*  CREATE a new User Entries
*/
router.get('/new', isLoggedIn, (req, res, next) => {
  new Tournament().fetchAll()
    .then((tournaments) => {
      res.render('new_user_entry', { isLoggedIn: req.isAuthenticated(), user: req.user, tournaments: tournaments.toJSON()})
    })
    .catch((error) => {
      next(error)
    })
})

/***
*  SAVE a new User Entries
*/
router.post('/', isLoggedIn, (req, res, next) => {
  new UserEntry({user_id: req.user.id, name: req.body.name, tournament_id: req.body.tournament_id}).save()
    .then(() => {
      res.redirect('/entries')
    })
    .catch((error) => {
      next(error)
    })
})

/***
*  UPDATE User Entries (only the name is updatable)
*/
router.put('/:entry_id', isLoggedIn, (req, res, next) => {
  new UserEntry({id: req.params.entry_id, user_id: req.user.id}).save({name: req.body.name})
    .then((entry) => {
      res.redirect('/entries')
    })
    .catch((error) => {
      next(error)
    })
})

/***
*  DELETE a User Entries
*/
router.delete('/:entry_id', isLoggedIn, (req, res, next) => {
  new UserEntry({user_id: req.user.id, id: req.params.entry_id}).destroy()
    .then(() => {
      res.redirect('/entries')
    })
    .catch((error) => {
      next(error)
    })
})

/***
*  Get 1 User Entry (and it's picks, if any)
*/
router.get('/:entry_id', isLoggedIn, (req, res, next) => {
  new UserEntry({id: req.params.entry_id, user_id: req.user.id})
    .fetch({withRelated: [
        'picks',
        'picks.tournamentParticipant',
        'picks.tournamentParticipant.country',
        'tournament'
    ]})
    .then((entry) => {
      res.render('user_entry', { isLoggedIn: req.isAuthenticated(), user: req.user, entry: entry.toJSON()})
    })
    .catch((error) => {
      next(error)
    })
})

/***
*  Get ALL User Entries
*/
router.get('/', isLoggedIn, (req, res, next) => {
  new UserEntry().query({where: {user_id: req.user.id}}).fetchAll({withRelated: ['tournament']})
    .then((entries) => {
      res.render('user_entries', { isLoggedIn: req.isAuthenticated(), user: req.user, entries: entries.toJSON()})
    })
    .catch((error) => {
      next(error)
    })
})

module.exports = router
