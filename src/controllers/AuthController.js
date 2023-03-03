const express = require('express');
const UserModel = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');
const User = require('../models/User');

const router = express.Router();

const generateToken = (user = {}) => {
  return jwt.sign({ id: user.id, name: user.name }, authConfig.secret, {
    expiresIn: 86400,
  });
};

router.post('/register', async (req, res) => {
  const { email } = req.body;

  if (await UserModel.findOne({ email })) {
    return res.status(400).json({
      error: true,
      message: 'Email já cadastrado',
      data: null,
    });
  }

  const newUser = await UserModel.create(req.body);

  newUser.password = undefined;

  return res.json({
    user: newUser,
    token: generateToken(newUser),
  });
});

router.post('/authenticate', async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email }).select('+password');

  if (!user) {
    return res.status(400).json({
      error: true,
      message: 'Usuário não encontrado',
    });
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({
      error: true,
      message: 'Senha inválida',
    });
  }

  user.password = undefined;

  return res.json({ user, token: generateToken(user) });
});

router.put('/user/:id', async (req, res) => {
  try {
    const userId = { _id: req.params.id };
    const newData = req.body;

    const updatedUser = await UserModel.findByIdAndUpdate(userId._id, newData, {
      new: true,
    });

    return res.json({
      user: updatedUser,
    });
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: 'Erro ao realizar a atualização',
      data: null,
    });
  }
});

module.exports = router;
