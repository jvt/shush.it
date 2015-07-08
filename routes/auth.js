var express = require('express');
var router = express.Router();
var sys    = require("util");

router.get('/twitter', function(req, res, next) {
  oauth.getOAuthRequestToken(function(error, oauthToken, oauthTokenSecret, results){
    if (error) {
      res.send("Error getting OAuth request token : " + sys.inspect(error), 500);
    } else {
      req.session.oauthRequestToken = oauthToken;
      req.session.oauthRequestTokenSecret = oauthTokenSecret;

      res.redirect("https://twitter.com/oauth/authenticate?oauth_token="+req.session.oauthRequestToken);
    }
  });
});

router.get('/twitter/return', function(req, res, next) {
  oauth.getOAuthAccessToken(
    req.session.oauthRequestToken,
    req.session.oauthRequestTokenSecret,
    req.query.oauth_verifier,
    function(error, oauthAccessToken, oauthAccessTokenSecret, results) {
      if (error) {
        res.send("Error getting OAuth access token : " + sys.inspect(error), 500);
      } else {
        req.session.oauthAccessToken = oauthAccessToken;
        req.session.oauthAccessTokenSecret = oauthAccessTokenSecret;

        // Clean up the session after trading request tokens for access tokens
        delete req.session.oauthRequestToken;
        delete req.session.oauthRequestTokenSecret;

        oauth.get(
          "https://api.twitter.com/1.1/account/verify_credentials.json",
          req.session.oauthAccessToken,
          req.session.oauthAccessTokenSecret,
          function (error, data, response) {
            if (error) {
              res.send("Error getting twitter screen name : " + sys.inspect(error), 500);
            } else {
              data = JSON.parse(data);
              req.session.twitterScreenName = data["screen_name"];

              res.redirect("/");
            }
          }
        );
      }
    }
  );
});

router.get('/destroy', function(req, res, next) {
  req.session.destroy(function(err) {
    res.redirect("/");
  })
});

module.exports = router;
