// Megha Mansuria
// I pledge my honor that I have abided by the Stevens Honor System.
// Lab 8 - routes/pages.js
const axios = require('axios');
const express = require('express');
const router = express.Router();

// GET http://localhost:3000/
router.get('/', async (req, res) => {
    res.render('pages/index');
});

// POST http://localhost:3000/search
router.post('/search', async (req, res) => {
    const term = req.body.searchTerm;
    // check if searchTerm parameter is invalid
    if (term.trim().length == 0) {
        res.status(400).render('pages/errors', { class: "error", message: "Search term keyword must be a non-empty string." });
        return;
    }
    // try to either render error HTML page if not found OR return the search results 
    try {
        //console.log("here");
        const { data } = await axios.get('http://api.tvmaze.com/search/shows?q=' + term);
        // error HTML page for no results found
        //console.log("here 2");
        if (data.length == 0) {
            res.render('pages/errors', { class: 'not-found', message: "We're sorry, but no results were found for " + term + "." });
            return;
        }
        //console.log("here 3");
        // otherwise, return top 20 results
        let results = [];
        if (data.length > 20) {
            for (i = 0; i < 20; i++) {
                results.push(data[i]);
            }
        }
        else {
            for (j = 0; j < data.length; j++) {
                results.push(data[j]);
            }
        }
        res.render('pages/searchResults', { title: "Shows Found", searchTerm: term, results })
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

// GET http://localhost:3000/shows/{id}
router.get('/shows/:id', async (req, res) => {
    const id = req.params.id;
    if (!id) { // check if id is given
        res.status(400).render({ class: "error", message: "No valid id is given." });
        return;
    }
    if (isNaN(id)) { // check if id is not a number
        res.status(400).render({ class: "error", message: "No valid id is given." });
        return;
    }
    try { // try to look for show by id
        const { data } = await axios.get('http://api.tvmaze.com/shows/' + id);
        res.render('pages/showResult', { title: data.name, showInfo: data, summary: data.summary.replace(/(<([^>]+)>)/ig, '') });
        //trim HTML tags: found on GeeksforGeeks (https://www.geeksforgeeks.org/how-to-strip-out-html-tags-from-a-string-using-javascript/#:~:text=To%20strip%20out%20all%20the,innerText%20property%20from%20HTML%20DOM.)
    } catch (e) { // error 404 - no show found
        res.status(404).render('pages/errors', { class: "error", message: "No show found for given id." });
    }
});

module.exports = router;