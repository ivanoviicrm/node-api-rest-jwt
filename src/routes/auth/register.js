const routes = require('express').Router();

// URL -> http://localhost:PORT/api/v1/register
routes.post('/register', (req, res) => {
  console.log(req.body);
});

module.exports = routes;