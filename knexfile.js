const path = require('path')

module.exports = {
  test: {
    client: 'pg',
    connection: 'postgres://localhost/sweepstakes_test',
    migrations: {
      directory: path.join(__dirname, '/db/migrations')
    },
    seeds: {
      directory: path.join(__dirname, '/db/seeds/test')
    }
  },
  development: {
    client: 'pg',
    connection: 'postgres://localhost/sweepstakes_heroku',
    // connection: 'postgres://localhost/sweepstakes_development',
    // debug: true,
    migrations: {
      directory: path.join(__dirname, '/db/migrations')
    },
    seeds: {
      directory: path.join(__dirname, '/db/seeds/development')
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: path.join(__dirname, '/db/migrations')
    },
    seeds: {
      directory: path.join(__dirname, '/db/seeds/production')
    }
  }
}
