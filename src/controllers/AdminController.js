const express = require('express');
const router = express.Router();
const UserModel = require('../models/User');

router.get('/users', async (req, res) => {
  const user = await UserModel.findOne({ _id: req.userLogged.id });
  const token = req.headers.authorization.split(' ')[1];

  return res.json({ user, token });
});

module.exports = router;
