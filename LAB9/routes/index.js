// Megha Mansuria
// I pledge my honor that I have abided by the Stevens Honor System.
// Lab 9 - routes/index.js
const fibRoutes = require('./fibprime');

const constructorMethod = (app) => {
    app.use('/', fibRoutes);
    app.use('*', (req, res) => {
      res.redirect('/');
    });
  };
  
  module.exports = constructorMethod;