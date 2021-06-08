// Megha Mansuria
// I pledge my honor that I have abided by the Stevens Honor System.
// Lab 9 - routes/fibprime.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('../views/page/fib-prime', {});
});

module.exports = router;