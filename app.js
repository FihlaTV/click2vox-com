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
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');

var Account = require('./models/account');
var dbURI = require('./db/configuration');

require('./config/passport')(passport);

//New Voxbone Object used for authentication
var Voxbone = require('voxbone-webrtc');
var voxbone = new Voxbone({
  voxrtcUsername: process.env.VOXBONE_WEBRTC_USERNAME,
  voxrtcSecret: process.env.VOXBONE_WEBRTC_PASSWORD,
  voxrtcExpiresInSeconds: 300
});

var app = express();
if (process.env.NEW_RELIC_LICENSE_KEY)
  app.locals.newrelic = newrelic;

// set timeout
app.use(timeout(process.env.TIMEOUT || '12s'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.png')));
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
  res.locals.authenticated = !!req.user;
  res.locals.currentUser = req.user || {};
  next();
});

var routes = require('./routes/index');
var accountRoutes = require('./routes/account');
var widgetRoutes = require('./routes/widget');
var sipRoutes = require('./routes/sip');
var utils = require('./routes/utils');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes(passport, voxbone));
app.use('/account', accountRoutes);
app.use('/widget', widgetRoutes);
app.use('/sip', sipRoutes);


require('coffee-script/register'); // <-- This dependency is to be removed very soon.
penguin = require('penguin');
admin = new penguin.Admin({
  fileManager: false,
  indexTitle: 'Click2Vox.com Admin Panel',
  menu: [
    [ 'Click2vox.com Home', '/admin' ],
    [ 'Accounts', '/admin/accounts' ]
    // [ 'Sections', [
    //   [ 'Accounts', '/admin/accounts' ],
      // [ 'Dids', '/admin/dids' ],
      // [ 'Ratings', '/admin/ratings' ],
      // [ 'Widgets', '/admin/widgets' ]
    // ] ]
  ],

  beforeMiddleware: function(req, res, next) {
    console.log('beforeMiddleware', req.url, Object.keys(req.$p));

    if(req.isAuthenticated()) {
      Account.findOne({ email: new RegExp(req.user.email, "i"), admin: true }, {}, function(err, admin_account){
        if (err || !admin_account)
          res.redirect('/');
        return next();
      });
    } else {
      res.redirect('/');
    }
  }
});
admin.setupApp(app);

// error handlers

// catch 404 and forward to error handler
app.use(utils.objectNotFound);

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
