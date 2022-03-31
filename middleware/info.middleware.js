const { lookup } = require('geoip-lite')

const middleware = (req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  console.log(ip)
  console.log(lookup(ip))
  return next()
}

module.exports = middleware
