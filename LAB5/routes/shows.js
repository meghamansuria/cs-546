// Megha Mansuria
// I pledge my honor that I have abided by the Stevens Honor System.
// Lab 5 - shows.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
  try {
    const {data} = await axios.get("http://api.tvmaze.com/shows");
    res.json(data);
  } catch (e) {
    res.status(500).json({ message: 'Shows not found' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    // check id is valid - throw 400 error bc not proper
    if (isNaN(id) || id % 1 != 0 || id < 0) {
        res.status(400).json({ message: 'Id is not valid' });;
    }
    // get the show by id now - throw 404 if show id not found
    const {data} = await axios.get(`http://api.tvmaze.com/shows/${id}`);
    res.json(data);
  } catch (e) {
    res.status(404).json({ message: 'Show by id not found' });;
  }
});

module.exports = router;