// Megha Mansuria
// I pledge my honor that I have abided by the Stevens Honor System.
// Lab 11 - routes/api.js
const express = require('express');
const router = express.Router();

router.get('/', function(request, response) {
	response.render('../views/layouts/main', {});
	//todoData.makeToDo(xss(request.body.name), xss(request.body.description));

	// response.json({ success: true, message: request.body.description });
	//response.json({ success: true, message: xss(request.body.description) });
});

module.exports = router;