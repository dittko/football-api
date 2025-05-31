const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.getAllUsers = async (req, res) => {
  const users = await User.find({}, '-password'); 
  res.json(users);
};

exports.createUser = async (req, res) => {
  const { email } = req.body;
  const password = Math.random().toString(36).slice(-8); 
  const hashed = await bcrypt.hash(password, 10);

  const user = new User({ email, password: hashed, isActive: true });
  await user.save();

  res.status(201).json({ message: 'Użytkownik utworzony', email, password });
};

exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'Użytkownik usunięty' });
};

exports.toggleAdmin = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: 'Nie znaleziono użytkownika' });

  user.isAdmin = !user.isAdmin;
  await user.save();
  res.json({ message: `Uprawnienia admina: ${user.isAdmin}` });
};

exports.toggleActive = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: 'Nie znaleziono użytkownika' });

  user.isActive = !user.isActive;
  await user.save();
  res.json({ message: `Status konta: ${user.isActive ? 'aktywny' : 'nieaktywny'}` });
};
