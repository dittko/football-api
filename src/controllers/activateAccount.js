exports.activateAccount = async (req, res) => {
  const { token } = req.params;
  const user = await User.findOne({ activationToken: token });

  if (!user || user.activationTokenExpires < Date.now()) {
    return res.status(400).json({ error: 'Token wygasł lub jest nieprawidłowy' });
  }

  user.isActive = true;
  user.activationToken = undefined;
  user.activationTokenExpires = undefined;
  await user.save();

  res.send('<h2>Konto aktywowane! Możesz się teraz zalogować.</h2>');
};
