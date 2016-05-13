const bcrypt = require('bcrypt-nodejs')

const knex = require('./knex.js')

const users = () => {
  return knex('users')
}

const findById = (id) => {
  return users().where({id})
}

const findByEmail = (email) => {
  return users().where({email})
}

const insertUser = (user) => {
  console.log('userqueries User', user)
  return users().returning('id').insert({
    password: generateHash(user.password),
    email: user.email
  })
}

const generateHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

const validPassword = (password, user) => {
  return bcrypt.compareSync(password, user.password)
}

module.exports = {findById, findByEmail, insertUser, validPassword}
