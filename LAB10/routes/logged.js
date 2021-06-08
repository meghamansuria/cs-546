// Megha Mansuria
// I pledge my honor that I have abided by the Stevens Honor System.
// Lab 10 - routes/logged.js
const express = require('express');
const router = express.Router();
const users = require('../users');
const bcrypt = require('bcrypt');

// GET /
// if the user is authenticated, it will redirect to /private.
// if the user is not authenticated, it will render a view with a login form
router.get('/', (req, res) => {
    //console.log(req.session.user);
    if (req.session.user) { // user is authenticated
        console.log('[' + new Date().toUTCString() + ']: ' + req.method + ' ' + req.originalUrl + ' (Authenticated User)')
        res.redirect('/private');
    }
    else { // user is not authenticated
        console.log('[' + new Date().toUTCString() + ']: ' + req.method + ' ' + req.originalUrl + ' (Non-Authenticated User)')
        // error = "Please log in with valid credentials.";
        res.status(401).render('../views/pages/login', {});
        return;
    }
});

// POST /login
// make a POST to this route, attempt to log a user in with the credentials
router.post('/login', async (req, res) => {
    const userName = req.body.username;
    const pass = req.body.password;
    let priv = {};  // use this to send to /private if found
    let found = false;
    // look for username in users
    for (let i = 0; i < users.length; i++) {
        if (users[i].username == userName) {
            priv = users[i];
            //console.log(users[i].username);
            found = true;
            break;
        }
    }
    // if user/username does not exist
    if (!found) {
        console.log('[' + new Date().toUTCString() + ']: ' + req.method + ' ' + req.originalUrl + ' (Non-Authenticated User)')
        error = "Please log in with valid credentials.";
        res.status(401).render('../views/pages/login', { error });
        // SEND ERROR MESSAGE ON LOGIN PAGE
        return;
    }
    // compare hashed password
    try {
        let compareToMatch = false;
        compareToMatch = await bcrypt.compare(pass, priv.hashedPassword);
        //console.log("checked");
        // if matched, go to private
        if (compareToMatch) {
            //console.log("go to private now!");
            req.session.user = priv;
            res.redirect('/private');
        }
        // if not matched, back to login with error message
        else {
            console.log('[' + new Date().toUTCString() + ']: ' + req.method + ' ' + req.originalUrl + ' (Non-Authenticated User)')
            error = "Please log in with valid credentials.";
            res.status(401).render('../views/pages/login', { error });
            // SEND ERROR MESSAGE ON LOGIN PAGE
            return;
        }
    } catch (e) {
        console.log('[' + new Date().toUTCString() + ']: ' + req.method + ' ' + req.originalUrl + ' (Non-Authenticated User)')
        error = "Please log in with valid credentials.";
        res.status(401).render('../views/pages/login', { error });
        //console.log("checked but failed");
        // SEND ERROR MESSAGE ON LOGIN PAGE
        return;
    }
});

// GET /private
// route will be protected by your own authentication middleware
// only allow valid, logged in users to see this page.
router.get('/private', (req, res) => {
    //console.log("private here 2!");
    const user = req.session.user;
    // if authenticated user
    if (user) {
        //console.log("private here");
        console.log('[' + new Date().toUTCString() + ']: ' + req.method + ' ' + req.originalUrl + ' (Authenticated User)')
        res.render('../views/pages/auth', { username: user.username, firstName: user.firstName, lastName: user.lastName, profession: user.profession, bio: user.bio });
    }
    else {
        console.log('[' + new Date().toUTCString() + ']: ' + req.method + ' ' + req.originalUrl + ' (Non-Authenticated User)')
        error = "Please log in with valid credentials.";
        res.status(401).render('../views/pages/login', { error });
    }
});

// GET /logout 
// route will expire/delete the AuthCookie
// inform the user that they have been logged out.
router.get('/logout', (req, res) => {
    req.session.destroy();
    console.log('[' + new Date().toUTCString() + ']: ' + req.method + ' ' + req.originalUrl + ' (Authenticated User)')
    res.render('../views/pages/logout', {});
});

module.exports = router;