var express = require('express');
var router = express.Router();

var exFilter = require('../models/exportedFilter').collection;

/* GET home page. */
router.get('/', function(req, res, next) {
  exFilter.query(function(qb) {
    qb.select('filter')
      .count('filter as filter_occurence')
      .groupBy('filter')
      .orderBy('filter_occurence')
      .limit(10);
  }).fetch({
    withRelated: ['filter']
  }).then(function(collection) {
    res.render('index', { title: 'Home', topFilters: collection.toJSON() });
  });
});

/* GET help page. */
router.get('/help', function(req, res, next) {
  res.render('help', { title: 'Help' });
});

module.exports = router;
