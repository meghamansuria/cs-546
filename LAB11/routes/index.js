// Megha Mansuria
// I pledge my honor that I have abided by the Stevens Honor System.
// Lab 11 - routes/index.js
const apiRoutes = require('./api');

const constructorMethod = (app) => {
  app.use('/', apiRoutes);

  app.use('*', (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;