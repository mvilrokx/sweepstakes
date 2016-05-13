const LocalStrategy = require('passport-local').Strategy

const userQueries = require('../db/user_queries')

module.exports = (passport) => {

  passport.serializeUser((id, done) => {
    done(null, id)
  })

  passport.deserializeUser((id, done) => {
    userQueries.findById(id)
      .then((user) => {
        done(null, user[0])
      })
      .catch((err) => {
        done(err)
      })
  })

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback
  },
    (req, email, password, done) => {
      // asynchronous
      // User.findOne wont fire unless data is sent back
      process.nextTick(() => {
        userQueries.findByEmail(email)
          .then((user) => {
            console.log('user', user)
            if (user[0]) {
              return done(null, false, req.flash('signupMessage', 'That email is already taken.'))
            } else {
              // create the user
              userQueries.insertUser({email, password})
                .then((user) => {
                  console.log('user[0]', user[0])
                  return done(null, user[0])
                })
                .catch((err) => {
                  done(err)
                })
            }
          })
          .catch((err) => {
            done(err)
          })
      })
    }))

  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
    (req, email, password, done) => {
      userQueries.findByEmail(email)
        .then((user) => {
          console.log('user', user)
          if (!user[0]) {
            return done(null, false, req.flash('loginMessage', 'No user found with that email.'))
          }
          if (!userQueries.validPassword(password, user[0])) {
            return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'))
          }
          return done(null, user[0].id)
        })
        .catch((err) => {
          done(err)
        })
    }))
}
