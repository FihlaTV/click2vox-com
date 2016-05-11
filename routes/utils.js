// Here it goes only utility methods
module.exports = {
  isLoggedIn: function (req, res, next) {
    if (req.isAuthenticated())
      return next();
    res.redirect('/');
  },

  redirectToWidgetIfLoggedIn: function (req, res, next) {
    if (req.isAuthenticated())
      return res.redirect('/widget');
    return next();
  },

  accountLoggedIn: function (req) {
    return req.isAuthenticated();
  },

  objectNotFound: function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  }
};