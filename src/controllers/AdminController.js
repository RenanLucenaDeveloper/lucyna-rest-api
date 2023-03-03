const express = require('express');
const router = express.Router();

router.get('/users', (req, res) => {
  return res.json({ logged: true });
});

module.exports = router;
