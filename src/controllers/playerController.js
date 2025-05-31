const Player = require('../models/Player');

exports.getAllPlayers = async (req, res) => {
  const players = await Player.find();
  res.json(players);
};

exports.getPlayerById = async (req, res) => {
  const player = await Player.findById(req.params.id);
  if (!player) return res.status(404).json({ message: 'Nie znaleziono' });
  res.json(player);
};

exports.createPlayer = async (req, res) => {
  const player = new Player(req.body);
  await player.save();
  res.status(201).json(player);
};

exports.updatePlayer = async (req, res) => {
  const updated = await Player.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: 'Nie znaleziono' });
  res.json(updated);
};

exports.deletePlayer = async (req, res) => {
  const deleted = await Player.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Nie znaleziono' });
  res.json({ message: 'Usunięto' });
};
