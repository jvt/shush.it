var express = require('express');
var router = express.Router();

/* GET top filters page. */
router.get('/', function(req, res, next) {
	res.render('search', { query: req.query['q'] });
});

module.exports = router;