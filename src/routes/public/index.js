const router = require('express').Router();

// People can access here with out tokens, is a public site

// URL -> http://localhost:PORT/api/v1/index
router.get('/', (req, res) => {
  res.json({
    data: "Random data you can access with out token"
  });
});

module.exports = router;