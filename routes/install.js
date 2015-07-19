var express = require('express');
var router = express.Router();

var Filter   = require('../models/filter').model;
var exFilter = require('../models/exportedfilter.js').model;

/* GET install page. */
router.get('/:id/', function(req, res, next) {
  var filterID = req.params.id;

  if (req.session.userID && filterID) {
    new exFilter({
      user: req.session.userID,
      filter: filterID
    }).fetch().then(function(storedTransaction) {
      if (storedTransaction == undefined) {
        new exFilter({
          user: req.session.userID,
          filter: filterID
        }).save();
      }
    });
  }

  new Filter({'id': filterID})
    .fetch()
    .then(function(model)
    {
      var filterRegex = model.attributes.pattern;
      res.redirect('tweetbot://mute/keyword?regex=1&text=' + filterRegex);
    });
});

module.exports = router;
