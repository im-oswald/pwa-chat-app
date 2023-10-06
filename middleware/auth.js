const jwt = require('jsonwebtoken');
const config = require('config');

function extractToken (req) {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  return null;
}

module.exports = (req, res, next) => {
  const token = extractToken(req);

  if(!token) {
    return res.status(401).json({ errors: [{ msg: 'Token not given. Access denied.' }] });
  }

  try {
    const decoded = jwt.decode(token, config.get('jwtSecret'));
    req.user = decoded.user;

    next();
  } catch(err) {
    return res.status(401).json({ errors: [{ msg: 'Token not valid. Access denied.' }] });
  }
}
