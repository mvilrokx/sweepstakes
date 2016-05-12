const request = require('request')

const insertCountry = (knex, country) => {
  return knex('countries').insert({
    code: country.isoAlpha3,
    name: country.countryName
  })
}

const nonCountries = [
  {countryName: 'England', isoAlpha3: 'ENG'},
  {countryName: 'Northern Ireland', isoAlpha3: 'NIR'},
  {countryName: 'Scotland', isoAlpha3: 'SCO'},
  {countryName: 'Wales', isoAlpha3: 'WAL'}
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
