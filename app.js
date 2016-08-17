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
var MongoDBStore = require('connect-mongodb-session')(session);

var params = require('strong-params');
var passport = require('passport');
var flash = require('connect-flash');

var Account = require('./models/account');
var dbURI = require('./db/configuration');

var pjson = require('./package.json');
var title = 'Voxbone Widget Generator v' + pjson.version;

require('./config/auth/passport')(passport);

var app = express();
if (process.env.NEW_RELIC_LICENSE_KEY)
  app.locals.newrelic = newrelic;


if (process.env.HONEYBADGER_API_KEY) {
  var Honeybadger = require('honeybadger');
  Honeybadger.configure({
    apiKey: process.env.HONEYBADGER_API_KEY
  });

  app.use(Honeybadger.requestHandler); // Use *before* all other app middleware.
}


// overrides the use function to grab the routes
var oldUse = app.use;
app._voxPaths = [];

app.use = function () {
  var _ = require('lodash');
  var urlBase = arguments[0];

  _.forEach(arguments, function(arg) {
    if (arg.name === 'router') {
      app._voxPaths.push({
        urlBase: urlBase,
        router: arg
      });
    }
  });

  return oldUse.apply(this, arguments);
};

// set timeout
app.use(timeout(process.env.TIMEOUT || '12s'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// set strong params
app.use(params.expressMiddleware());

app.use(cookieParser());

var sessionStore = new MongoDBStore({uri: dbURI, collection: 'sessions'});
var secret_key = process.env.SECRET_KEY || 'xXxXxXxXxX';

app.use(session({
  secret: secret_key,
  name: 'voxbone-generator',
  resave: true,
  saveUninitialized: false,
  store: sessionStore
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// set some default variables to be accessed in views
app.use(function (req, res, next) {
  res.locals.currentUser = req.user || {};
  res.locals.authenticated = !!req.user;

  if(res.locals.authenticated) {
    res.locals.currentUser.gravatar = utils.userGravatarUrl(res);
  }

  next();
});

var routes = require('./routes/index');
var contactRoutes = require('./routes/contact');
var accountRoutes = require('./routes/account');
var authRoutes = require('./routes/auth');
var widgetRoutes = require('./routes/widget');
var sipRoutes = require('./routes/sip');
var utils = require('./routes/utils');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes(passport));
app.use('/account', accountRoutes);
app.use('/api', contactRoutes);
app.use('/auth', authRoutes);
app.use('/sip', sipRoutes);
app.use('/widget', widgetRoutes);


// this should go *after* all other app middleware but *before* own error handlers
if (process.env.HONEYBADGER_API_KEY)
  app.use(Honeybadger.errorHandler);


// error handlers

// catch 404 and forward to error handler
app.use(utils.objectNotFound);

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      title: title,
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
