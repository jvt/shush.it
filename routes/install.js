var express = require('express');
var router = express.Router();

var Filter   = require('../models/filter').model;
var exFilter = require('../models/exportedfilter.js').model;

/* GET install page. */
router.get('/:id/', function(req, res, next) {
  var filterID = req.params.id;

  new Filter({ id: filterID })
  .fetch()
  .then(function(filterModel) {
    if (filterModel) {
      if (req.session.userID) {
        new exFilter({
          user: req.session.userID,
          filter: filterID
        }).fetch()
        .then(function(storedTransaction) {
          if (storedTransaction == undefined || storedTransaction == null) {
            new exFilter({
              user: req.session.userID,
              filter: filterID
            }).save()
            .then(function()
            {
              var filterPattern = filterModel.attributes.pattern;
              var filterType    = filterModel.attributes.type;
              if (filterType === 'regex') {
                res.redirect('tweetbot:///mute/keyword?muteLists=1&regex=1&text=' + encodeURIComponent(filterPattern));
              } else {
                res.redirect('tweetbot:///mute/keyword?muteLists=1&regex=0&text=' + encodeURIComponent(filterPattern));
              }
            })
            .catch(function() {
              req.flash('error', 'There was an error attempting to install that filter');
              res.redirect('back');
            });
          } else {
            var filterPattern = filterModel.attributes.pattern;
            var filterType    = filterModel.attributes.type;
            if (filterType === 'regex') {
              res.redirect('tweetbot:///mute/keyword?muteLists=1&regex=1&text=' + encodeURIComponent(filterPattern));
            } else {
              res.redirect('tweetbot:///mute/keyword?muteLists=1&regex=0&text=' + filterPattern);
            }
          }
        });
      } else {
        var filterPattern = filterModel.attributes.pattern;
        var filterType    = filterModel.attributes.type;
        if (filterType === 'regex') {
          res.redirect('tweetbot:///mute/keyword?muteLists=1&regex=1&text=' + encodeURIComponent(filterPattern));
        } else {
          res.redirect('tweetbot:///mute/keyword?muteLists=1&regex=0&text=' + encodeURIComponent(filterPattern));
        }
      }
    } else {
      var error = new Error();
      error.status = 404;
      error.message = 'Looks like you\'ve either navigated to a page that doesn\'t exist or you followed a broken link to get here';
      next(error);
    }
  });
});

module.exports = router;
