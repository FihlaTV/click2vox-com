var testUtils = require('../routes/utils');

module.exports = {
  'Checks that all routes respond properly': function(browser) {
    var routes = testUtils.getVoxRoutes(), excludedPaths = [];

    routes.forEach(function(route) {
      // NOTE: we test routes with GET methods for now.
      // we'll improve this to cover other methods routes
      if (route.method !== 'get') return;

      var path = route.path;

      // ignore some routes that need to be treated different
      if (path.indexOf('*') !== -1 || path.indexOf(':') !== -1) {
        excludedPaths.push(path);
        return;
      }

      browser
        .url(browser.launchUrl + path, function (response) {
          console.log('Checking url:', browser.launchUrl + path);

          this.assert.equal(typeof response, 'object', 'Response object correctly received');
          this.assert.equal(response.status, 0, 'Response status ok');

          // make sure is not the error page
          this.assert.elementNotPresent('.errorPageRaised', 'No error message present');
        });
    });

    console.log('Paths not tested:', excludedPaths);

    browser.end();
  }
};