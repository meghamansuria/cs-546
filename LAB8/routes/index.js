// Megha Mansuria
// I pledge my honor that I have abided by the Stevens Honor System.
// Lab 8 - routes/index.js
const pagesRoutes = require('./pages');

const constructorMethod = (app) => {
    app.use('/', pagesRoutes);
    app.use('*', (req, res) => {
      res.status(404).json({ error: 'Not found' });
    });
  };
  
  module.exports = constructorMethod;