const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const crypto = require('crypto');
const { sendActivationEmail } = require('../utils/mailer');
const { sendResetPasswordEmail } = require('../utils/mailer'); // dodaj to!

exports.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);

    const token = crypto.randomBytes(20).toString('hex');
    const expires = Date.now() + 24 * 60 * 60 * 1000; // 24h

    const user = new User({
      email,
      password: hashed,
      activationToken: token,
      activationTokenExpires: expires
    });

    await user.save();
    await sendActivationEmail(email, token);

    res.status(201).json({ message: 'Zarejestrowano. Sprawdź e-mail i aktywuj konto.' });
  } catch (err) {
  console.error(err); // 🔍 pokaże błąd w konsoli
  res.status(400).json({ error: 'Rejestracja nie powiodła się', details: err.message });

  }
};
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Nieprawidłowy login' });

    if (!user.isActive) return res.status(403).json({ error: 'Konto nieaktywne. Sprawdź e-mail.' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Nieprawidłowe hasło' });

    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.json({ token });
  } catch {
    res.status(500).json({ error: 'Błąd logowania' });
  }
};

exports.activateAccount = async (req, res) => {
  const { token } = req.params;
  try {
    const user = await User.findOne({ activationToken: token });

    if (!user || user.activationTokenExpires < Date.now()) {
      return res.status(400).send('Token wygasł lub jest nieprawidłowy.');
    }

    user.isActive = true;
    user.activationToken = undefined;
    user.activationTokenExpires = undefined;
    await user.save();

    res.send('<h2>Konto aktywowane! Możesz się teraz zalogować.</h2>');
  } catch {
    res.status(500).send('Błąd aktywacji konta.');
  }
};

exports.changePassword = async (req, res) => {
  const userId = req.user.userId;
  const { newPassword, repeatPassword } = req.body;

  if (newPassword !== repeatPassword) {
    return res.status(400).json({ error: 'Hasła nie są takie same' });
  }

  const hashed = await bcrypt.hash(newPassword, 10);
  await User.findByIdAndUpdate(userId, { password: hashed });

  res.json({ message: 'Hasło zostało zmienione' });
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: 'Nie znaleziono użytkownika' });

  const token = crypto.randomBytes(20).toString('hex');
  const expires = Date.now() + 3600000;

  user.resetPasswordToken = token;
  user.resetPasswordExpires = expires;
  await user.save();

  await sendResetPasswordEmail(user.email, token); // ✅ teraz działa

  res.json({ message: 'Wysłano e-mail z linkiem do zmiany hasła' });
};


exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword, repeatPassword } = req.body;

  if (newPassword !== repeatPassword) {
    return res.status(400).json({ error: 'Hasła nie są takie same' });
  }

  const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
  if (!user) return res.status(400).json({ error: 'Token wygasł lub jest nieprawidłowy' });

  user.password = await bcrypt.hash(newPassword, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  res.json({ message: 'Hasło zostało zmienione' });
};

//tak