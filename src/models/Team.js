const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  league: { type: String },
  founded: { type: Number },
}, { collection: 'teams' });

module.exports = mongoose.model('Team', teamSchema);
