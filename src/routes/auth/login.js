const routes = require('express').Router();

// URL -> http://localhost:PORT/api/v1/login
routes.get('/login', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

module.exports = routes;