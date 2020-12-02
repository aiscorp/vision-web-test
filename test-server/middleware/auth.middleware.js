const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS')
    return next()

  try {
    const token = getToken(req.headers)

    if (!token)
      return res.status(401).send({message: 'No authorization, bad bearer token'})

    const decoded = jwt.verify(token, config.get('secret'))

    req.user = decoded
    next()

  } catch (e) {
    res.status(401).send({message: 'No authorization, error caught'})
  }
}

// Get bearer token from req.headers
const getToken = headers => headers.authorization.split(' ')[1]
