const mongoose = require('../database');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  cart: {
    type: Array,
    default: [['empty']],
  },
  library: {
    type: Array,
    default: [['empty']],
  },
});

UserSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 2);
  this.password = await hash;
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
