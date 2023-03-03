const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      error: true,
      message: 'forneça o Token',
    });
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2 && parts[0] !== 'Bearer') {
    return res.status(401).json({
      error: true,
      message: 'Token informado porém inválido',
    });
  }

  jwt.verify(parts[1], authConfig.secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        error: true,
        message: 'Token inválido ou expirado',
      });
    }

    req.userLogged = decoded;

    next();
  });
};
