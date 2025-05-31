require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const playerRoutes = require('./src/routes/players');
const authRoutes = require('./src/routes/auth');
const teamRoutes = require('./src/routes/teams');
const llmRoutes = require('./src/routes/llm');



const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
const adminRoutes = require('./src/routes/admin');
app.use('/api/admin', adminRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/llm', llmRoutes);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Connection error:', err));
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Połączono z MongoDB');
    app.listen(process.env.PORT, () =>
      console.log(`Serwer działa na porcie ${process.env.PORT}`)
    );
  })
  .catch(err => console.error('Błąd MongoDB:', err));


  module.exports = app;
if (require.main === module) {
  app.listen(process.env.PORT || 5000, () =>
    console.log(` Serwer działa na porcie ${process.env.PORT || 5000}`)
  );
}