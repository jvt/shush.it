var express = require('express');
var router = express.Router();

var Filter = require('../models/filter').model;

/* GET top filters page. */
router.get('/', function(req, res, next) {
  var searchQuery = req.query['q'];
  Filter.query(function (qb) {
    qb.where('title', 'LIKE', '%' + searchQuery + '%');
  }).fetchAll()
    .then(function(model)
    {
      var rows = [];
      model.models.forEach(function(model, index) {
        if (index === 0 || index % 2 === 0) {
          var newRow = [];
          newRow.push(model);
          rows.push(newRow);
        } else {
          rows[rows.length-1].push(model);
        }
      });
      res.render('search', { title: 'Search', query: searchQuery, numResults: model.length, results: model.models, rowLayout: rows });
    });
});

module.exports = router;
