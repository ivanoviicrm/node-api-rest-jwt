const routes = require('express').Router();

// URL -> http://localhost:PORT/api/v1/register
routes.get('/register', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

module.exports = routes;