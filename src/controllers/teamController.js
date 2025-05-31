const Team = require('../models/Team');

exports.getAll = async (req, res) => {
  const teams = await Team.find();
  res.json(teams);
};

exports.getOne = async (req, res) => {
  const team = await Team.findById(req.params.id);
  if (!team) return res.status(404).json({ error: 'Nie znaleziono zespołu' });
  res.json(team);
};

exports.create = async (req, res) => {
  const team = new Team(req.body);
  await team.save();
  res.status(201).json(team);
};

exports.update = async (req, res) => {
  const team = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!team) return res.status(404).json({ error: 'Nie znaleziono zespołu' });
  res.json(team);
};

exports.remove = async (req, res) => {
  const team = await Team.findByIdAndDelete(req.params.id);
  if (!team) return res.status(404).json({ error: 'Nie znaleziono zespołu' });
  res.json({ message: 'Usunięto zespół' });
};
