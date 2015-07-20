var express = require('express');
var router = express.Router();

var Filter   = require('../models/filter').model;

router.get('/new/', function(req, res, next) {
  if (req.session.userID) {
    res.render('filter/new', { title: 'Add a Filter', csrf: req.csrfToken() });
  } else {
    req.flash('error', 'You must be logged in with Twitter to submit a filter.');
    res.redirect('/');
  }
});

router.post('/new/', function(req, res, next) {
  new Filter({
    owner: req.session.userID,
    title: req.body.filterName,
    description: req.body.filterDescription,
    type: req.body.filterType,
    pattern: req.body.filterContent
  }).save()
  .catch(function(errors)
  {
    console.log(errors);
    errors.forEach(function(error)
    {
      req.flash('error', ' ' + error.message);
    });
    res.redirect('back');
  })
  .then(function(newFilter) {
    if (newFilter) {
      req.flash('success', 'Successfully saved your new filter');
      res.redirect('/filter/' + newFilter.attributes.id + '/');
    } else {
      // 500-Internal Server error
      req.flash('error', 'Whoops looks like there was an error saving that.');
      res.redirect('back');
    }
  });
});

/* GET filter page. */
router.get('/:id/', function(req, res, next) {
  var filterID = req.params.id;
  new Filter({'id': filterID})
  .fetch({
    withRelated: ['owner']
  })
  .then(function(model) {
    if (req.session.userID && req.session.userID == model.related('owner').toJSON().id) {
      res.render('filter', { title: 'Filter', filter: model.attributes, owner: model.related('owner').toJSON(), csrf: req.csrfToken(), createdByUser: true });
    } else {
      res.render('filter', { title: 'Filter', filter: model.attributes, owner: model.related('owner').toJSON(), createdByUser: false });
    }
  });
});

router.get('/:id/preview', function(req, res, next) {
  var filterID = req.params.id;

  new Filter({id: filterID}).fetch().then(function(model) {
    oauth.get(
      "https://api.twitter.com/1.1/statuses/home_timeline.json",
      req.session.oauthAccessToken,
      req.session.oauthAccessTokenSecret,
      function (error, data, response) {
        data = JSON.parse(data);

        var tweets = [];

        for (var i = 0; i < data.length; i++) {
          var tweet = data[i];

          if (model.attributes.type == "keyword") {
            tweet.filtered = !(tweet.text.indexOf(model.attributes.pattern) == -1);
          } else if (model.attributes.type == "regex") {
            var pattern = new RegExp(model.attributes.pattern);
            tweet.filtered = pattern.test(tweet.text);
          }

          tweet.user.profile_image_url = tweet.user.profile_image_url.replace('_normal', '_bigger');

          tweets.push(tweet);
        }

        res.render('filter_preview', { title: 'Filter', filter: model.attributes, tweets: tweets });
      }
      );
  });
});

router.post('/:id/delete/', function(req, res, next) {
  var filterID = req.params.id;

  if (!req.session.userID) {
    req.flash('error', 'You must be logged in to access that');
    res.redirect('back');
    return false;
  } else {
    new Filter({id: filterID})
    .fetch()
    .then(function(model) {
      if (model.attributes.owner == req.session.userID) {
        model.destroy()
        .then(function() {
          req.flash('success', 'That filter has been successfully deleted');
          res.redirect('/');
        });
      } else {
        req.flash('error', 'You\'re not authorized to access that');
        res.redirect('back');        
      }
    });
  }
});

module.exports = router;