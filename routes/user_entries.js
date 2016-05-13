const router = require('express').Router()

const userEntriesQueries = require('../db/user_entries_queries.js')
const tournamentQueries = require('../db/tournament_queries.js')

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next()
  res.redirect('/users/login')
}

/***
*  DELETE a User Entries
*/
router.delete('/:entry_id', isLoggedIn, (req, res, next) => {
  userEntriesQueries.deleteUserEntry(req.user, req.params.entry_id)
    .then(() => {
      res.redirect('/entries')
    })
    .catch((error) => {
      next(error)
    })
})

/***
*  CREATE a new User Entries
*/
router.get('/new', isLoggedIn, (req, res, next) => {
  tournamentQueries.allTournaments()
    .then((tournaments) => {
      res.render('new_user_entry', { isLoggedIn: req.isAuthenticated(), user: req.user, tournaments: tournaments})
    })
    .catch((error) => {
      next(error)
    })
})

/***
*  SAVE a new User Entries
*/
router.post('/', isLoggedIn, (req, res, next) => {
  userEntriesQueries.insertUserEntry({user: req.user, name: req.body.name, tournament_id: req.body.tournament_id})
    .then(() => {
      res.redirect('/entries')
    })
    .catch((error) => {
      next(error)
    })
})

/***
*  Get 1 User Entry
*/
router.get('/:entry_id', isLoggedIn, (req, res, next) => {
  userEntriesQueries.getUserEntry(req.user, req.params.entry_id)
    .then((entry) => {
      res.format({
        json: () => {
          res.status(200).json(entry[0])},
        html: () => {
          res.render('user_entry', { isLoggedIn: req.isAuthenticated(), user: req.user, entry: entry[0]})
        }
      })
    })
    .catch((error) => {
      next(error)
    })
})

/***
*  UPDATE User Entries (only the name is updatable)
*/
router.put('/:entry_id', isLoggedIn, (req, res, next) => {
  userEntriesQueries.updateUserEntry(req.user, req.params.entry_id, req.body.name)
    .then((entry) => {
      res.redirect('/entries')
    })
    .catch((error) => {
      next(error)
    })
})

/***
*  Get ALL User Entries
*/
router.get('/', isLoggedIn, (req, res, next) => {
  userEntriesQueries.getUserEntries(req.user)
    .then((entries) => {
      res.format({
        json: () => {
          res.status(200).json(entries)},
        html: () => {
          res.render('user_entries', { isLoggedIn: req.isAuthenticated(), user: req.user, entries: entries})
        }
      })
    })
    .catch((error) => {
      next(error)
    })
})

module.exports = router