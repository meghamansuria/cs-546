// Megha Mansuria
// I pledge my honor that I have abided by the Stevens Honor System.
// Lab 5 - index.js
const showsRoutes = require('./shows');
const aboutMeRoutes = require('./aboutme');

const constructorMethod = (app) => {
  app.use('/shows', showsRoutes);
  app.use('/aboutme', aboutMeRoutes);

  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Not found' });
  });
};

module.exports = constructorMethod;