const request = require('request')

const insertCountry = (knex, country) => {
  return knex('countries').returning('name').insert({
    id: country.isoAlpha3,
    code: country.countryCode,
    name: country.countryName
  }).then((country) => {
    console.log(`Successfully inserted Country ${country[0]}`)
  }).catch((error) => {
    if (error.code === '23505' && error.constraint === 'countries_pkey') {
      console.log(`Country ${country.countryName} already exists`)
    } else {
      console.log('error', error)
    }
  })
}

const nonCountries = [
  {countryName: 'England', isoAlpha3: 'ENG', countryCode: 'EL'},
  {countryName: 'Northern Ireland', isoAlpha3: 'NIR', countryCode: 'ND'},
  {countryName: 'Scotland', isoAlpha3: 'SCO', countryCode: 'OL'},
  {countryName: 'Wales', isoAlpha3: 'WAL', countryCode: 'WL'}
]

exports.seed = (knex, Promise) => {
  const requestAsync = Promise.promisify(request)
  // TODO: turn mvilrokx into env variable
  return requestAsync('http://api.geonames.org/countryInfoJSON?username=mvilrokx')
    .then((result) => {
      return JSON.parse(result.body).geonames.concat(nonCountries)
    })
    .then((countries) => {
      return Promise.map(countries, (country) => {
        return insertCountry(knex, country)
      })
    })
    .catch((error) => {
      console.log(error)
    })
}
