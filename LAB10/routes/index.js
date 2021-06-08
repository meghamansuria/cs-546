// Megha Mansuria
// I pledge my honor that I have abided by the Stevens Honor System.
// Lab 10 - routes/index.js
const loggedRoutes = require('./logged');

const constructorMethod = (app) => {
  app.use('/', loggedRoutes);
  app.use('*', (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;