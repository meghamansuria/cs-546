// Megha Mansuria
// I pledge my honor that I have abided by the Stevens Honor System.
// Lab 10 - app.js
const express = require('express');
var exphbs  = require('express-handlebars');
const app = express();
const static = express.static(__dirname + '/public');
const session = require('express-session');
const configRoutes = require('./routes');

app.use;
app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine('handlebars', exphbs()); // https://www.npmjs.com/package/express-handlebars
app.set('view engine', 'handlebars');

app.use(
  session({
    name: 'AuthCookie',
    secret: "This is a secret.. shhh don't tell anyone",
    saveUninitialized: true,
    resave: false
  })
);

app.use('/private', (req, res, next) => {
  //console.log(req.session.user);
  if (!req.session.user) {
    return res.redirect('/');
  } else {
    next();
  }
});

app.use('/login', (req, res, next) => {
  if (req.session.user) {
    return res.redirect('/private');
  } else {
    //here I'm just manually setting the req.method to post since it's usually coming from a form
    // req.method = 'POST';
    next();
  }
});

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});