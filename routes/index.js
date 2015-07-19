var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

/* GET help page. */
router.get('/help', function(req, res, next) {
  res.render('help', { title: 'Help' });
});

/* GET privacy page. */
router.get('/privacy', function(req, res, next) {
  res.render('privacy', { title: 'Privacy' });
});

module.exports = router;
