const router = require('express').Router()

// route middleware to make sure a user is logged in
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next()
  res.redirect('/')
}

const userRoutes = (passport) => {
  router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/users/signup',
    failureFlash: true // allow flash messages
  }))

  router.get('/signup', (req, res) => {
    res.render('signup', { message: req.flash('signupMessage') })
  })

  router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
  }))

  router.get('/login', (req, res) => {
    res.render('login', { message: req.flash('loginMessage') })
  })

  router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
  })

  return router
}

module.exports = userRoutes
