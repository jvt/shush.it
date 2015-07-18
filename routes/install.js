var express = require('express');
var router = express.Router();

var Filter   = require('../models/filter').model;

/* GET install page. */
router.get('/:id/', function(req, res, next) {
	var filterID = req.params.id;
	new Filter({'id': filterID})
		.fetch()
		.then(function(model)
		{
			var filterRegex = model.attributes.pattern;
			res.redirect('tweetbot://mute/keyword?regex=1&text=' + filterRegex);
		});
});

module.exports = router;