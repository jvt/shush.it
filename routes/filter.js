var express = require('express');
var router = express.Router();

var Filter   = require('../models/filter').model;

/* GET filter page. */
router.get('/:id/', function(req, res, next) {
	var filterID = req.params.id;
	new Filter({'id': filterID})
		.fetch()
		.then(function(model)
		{
			console.log(model);
		});
	res.render('filter', { title: 'Filter', filterID: filterID });
});

module.exports = router;