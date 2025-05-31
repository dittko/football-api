const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, enum: ['bramkarz', 'obrońca', 'pomocnik', 'napastnik'], required: true },
  number: { type: Number, required: true },
  club: { type: String, required: true },
  nationality: { type: String, required: true },
  age: { type: Number, required: true }
}, { collection: 'players' }); 

module.exports = mongoose.model('Player', playerSchema);