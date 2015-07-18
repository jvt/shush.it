var bookshelf    = require('bookshelf');
var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser');
var express      = require('express');
var exphbs       = require('express-handlebars');
var session      = require('express-session');
var logger       = require('morgan');
var nconf        = require('nconf');
var OAuth        = require('oauth');
var path         = require('path');
var favicon      = require('serve-favicon');
var KnexSessionStore = require('connect-session-knex')(session);

var knexfile = require('./knexfile');

var app = express();

// view engine setup
var hbs = exphbs.create({
  defaultLayout: 'main',
  partialsDir: [
    'views/partials'
  ]
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// uncomment when shipping into production
//app.enable('view cache');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

GLOBAL.config = nconf.argv().env().file({ file: path.join(__dirname, 'config.json') });

var knex = require('knex')(knexfile);

bookshelf.DB = require('bookshelf')(knex);

GLOBAL.oauth = new OAuth.OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  config.get('oauth').twitter.consumerKey,
  config.get('oauth').twitter.secret,
  '1.0A',
  null,
  'HMAC-SHA1'
);

var session_store = new KnexSessionStore({
  knex: knex,
  tablename: 'sessions' // optional. Defaults to 'sessions'
});

app.use(session({
  cookie: {
    maxAge: 1209600
  },
  secret: config.get('session').secret,
  resave: false,
  saveUninitialized: false,
  store: session_store
}));

var routes        = require('./routes/index');
var routes_auth   = require('./routes/auth');
var routes_search = require('./routes/search');
var routes_top    = require('./routes/top');

app.use('/', routes);
app.use('/auth', routes_auth);
app.use('/search', routes_search);
app.use('/top', routes_top);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
