const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isActive: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false }, 
  activationToken: String,
  activationTokenExpires: Date,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  createdAt: { type: Date, default: Date.now }
}, { collection: 'users' });

module.exports = mongoose.model('User', userSchema);
