var express = require('express');
var router = express.Router();

var exFilter = require('../models/exportedfilter').collection;
var filter = require('../models/filter').model;
var user     = require('../models/user').model;

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

    new filter().query(function(qb){
        qb.orderBy('created_at','DESC');
        qb.limit(6);
    }).fetchAll({

    }).then(function(newest) {
      var newestRows = [];
      newest.toJSON().forEach(function(model, index) {
        if (index === 0 || index % 2 === 0) {
          var newRow = [];
          newRow.push(model);
          newestRows.push(newRow);
        } else {
          newestRows[newestRows.length-1].push(model);
        }
      });

      res.render('index', { title: 'Home', numResults: model.length, results: model.toJSON(), rowLayout: rows, newRowLayout: newestRows });
    });
  });
});

/* GET user's submitted filters */
router.get('/:twitterScreenName', function(req, res, next) {
  if (!req.session.userID) {
    var err = new Error();
    err.status = 404;
    err.message = 'Looks like you\'ve either navigated to a page that doesn\'t exist or you followed a broken link to get here';
    next(err);
  } else {
    var filter = require('../models/filter').model;
    var twitterScreenName = req.params.twitterScreenName;

    new user({ twitter_screenname: twitterScreenName })
    .fetch()
    .then(function(userModel) {
      if (!userModel) {
        var err = new Error();
        err.status = 404;
        err.message = 'Looks like you\'ve either navigated to a page that doesn\'t exist or you followed a broken link to get here';
        next(err);
      }
      
      if (userModel.attributes.id === req.session.userID) {
        new filter({ owner: userModel.attributes.id })
        .fetchAll()
        .then(function(filtersModel) {
          res.render('myfilters', { title: 'My filters', filters: filtersModel.toJSON(), numFilters:filtersModel.toJSON().length });
        });
      } else {
        var err = new Error();
        err.status = 404;
        err.message = 'Looks like you\'ve either navigated to a page that doesn\'t exist or you followed a broken link to get here';
        next(err);
      }

    });
  }
});


/* GET help page. */
router.get('/help', function(req, res, next) {
  res.render('help', { title: 'Help' });
});

module.exports = router;
