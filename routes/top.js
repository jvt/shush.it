var express = require('express');
var router = express.Router();

/* GET top filters page. */
router.get('/', function(req, res, next) {
	res.render('top', { title: 'Top' });
});

module.exports = router;