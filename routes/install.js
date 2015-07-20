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
        }).save()
        .catch(function() {
          req.flash('error', 'There was an error attempting to install that filter');
          res.redirect('back');   
        });
      }
    });
  }

  new Filter({'id': filterID})
    .fetch()
    .then(function(model)
    {
      var filterPattern = model.attributes.pattern;
      var filterType    = model.attributes.type;
      if (filterType === 'regex') {
        res.redirect('tweetbot:///mute/keyword?muteLists=1&regex=1&text=' + filterPattern);
      } else {
        res.redirect('tweetbot:///mute/keyword?muteLists=1&regex=0&text=' + filterPattern);
      }
    });
});

module.exports = router;
