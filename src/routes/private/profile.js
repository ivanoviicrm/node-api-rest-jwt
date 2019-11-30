const router = require('express').Router();
const verifyToken = require('../../middlewares/verifyToken');

// People cannot access here with out tokens, is a private site

// URL -> http://localhost:PORT/api/v1/profile
router.get('/', verifyToken, (req, res) => {
  res.json({
    data: "Random data you should not access with out token"
  });
});

module.exports = router;