// Megha Mansuria
// I pledge my honor that I have abided by the Stevens Honor System.
// Lab 5 - aboutme.js
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const aboutMe = {
        "name": "Megha Mansuria",
        "cwid": "10440306",
        "biography": "Hello world, I'm a 3/4 computer science major. Here at Stevens, I am involved in SWiCS (as the treasurer) and Alpha Phi Omega (a co-ed service fraternity). I like expressing my creativity through different art forms and I love music, except I can't sing.\nWhenever I get the chance, I like going on coffee runs and long drives after a long day of working on assignments and coding. I've always had an interest in web development, so I was really excited for this class - and I'm super happy with how much I've learned from this course so far!",
        "favoriteShows": ["Brooklyn Nine-Nine", "New Girl", "The Blacklist", "Psych"]
    }
    res.json(aboutMe);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;