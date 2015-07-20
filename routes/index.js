var express = require('express');
var router = express.Router();

var exFilter = require('../models/exportedFilter').collection;

/* GET home page. */
router.get('/', function(req, res, next) {
  exFilter.query(function(qb) {
    qb.select('filter')
      .count('filter as filter_occurence')
      .groupBy('filter')
      .orderBy('filter_occurence', 'desc')
      .limit(10);
  }).fetch({
    withRelated: ['filter']
  }).then(function(model) {

    var rows = [];
    model.toJSON().forEach(function(model, index) {
      if (index === 0 || index % 2 === 0) {
        var newRow = [];
        newRow.push(model);
        rows.push(newRow);
      } else {
        rows[rows.length-1].push(model);
      }
    });

    res.render('index', { title: 'Home', numResults: model.length, results: model.toJSON(), rowLayout: rows });
  });
});

/* GET help page. */
router.get('/help', function(req, res, next) {
  res.render('help', { title: 'Help' });
});

module.exports = router;
