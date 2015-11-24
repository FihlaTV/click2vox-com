if (process.env.NEW_RELIC_LICENSE_KEY)
  var newrelic = require('newrelic');

var express = require('express');
var timeout = require('connect-timeout');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
require('./db/configuration');
require('./config/passport')(passport);

//New Voxbone Object used for authentication
var Voxbone = require('voxbone-webrtc');
var voxbone = new Voxbone({
  voxrtcUsername: process.env.VOXBONE_WEBRTC_USERNAME,
  voxrtcSecret: process.env.VOXBONE_WEBRTC_PASSWORD
});

var app = express();

// set timeout
app.use(timeout('12s'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

var secret_key = process.env.SECRET_KEY ? process.env.SECRET_KEY : 'xXxXxXxXxX';
app.use(session({
  secret: secret_key,
  name: 'voxbone-generator',
  resave: true,
  saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

var routes = require('./routes/index');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes(passport, voxbone));

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
