const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const passport = require('passport')
const flash = require('connect-flash')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')

const routes = require('./routes/index')
const users = require('./routes/users')(passport)
const leaderboard = require('./routes/leaderboard')
const tournaments = require('./routes/tournaments')
const tournament_groups = require('./routes/tournament_groups')
const countries = require('./routes/countries')
const fixtures = require('./routes/fixtures')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

require('./config/passport')(passport) // pass passport for configuration

// required for passport
app.use(session({
  secret: 'jkg8i32y6fmnyo492%^H32dcBhyjhji4()^$#Gk^4',
  resave: true,
  saveUninitialized: true
})) // session secret
app.use(passport.initialize())
app.use(passport.session()) // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', routes)
app.use('/users', users)
app.use('/leaderboard', leaderboard)
app.use('/tournaments', tournaments)
app.use('/tournaments', tournament_groups)
app.use('/countries', countries)
app.use('/tournaments', fixtures)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

module.exports = app
