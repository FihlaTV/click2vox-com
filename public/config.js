require.config({
  shim: {
    bootstrap: {
      deps: [
        'jquery'
      ]
    },
    angular: {
      exports: 'angular'
    },
    'angular-cookies': {
      deps: ['angular'], init: function () {
        return 'ngCookies';
      }
    },
    'angular-sanitize': {
      deps: 'angular', init: function () {
        return 'ngSanitize';
      }
    },
  },
  paths: {
    angular: 'lib/angular/angular',
    'angular-cookies': 'lib/angular-cookies/angular-cookies',
    'angular-sanitize': 'lib/angular-sanitize/angular-sanitize',
    bootstrap: 'lib/bootstrap/dist/js/bootstrap',
    clipboard: 'lib/clipboard/dist/clipboard',
    jquery: 'lib/jquery/dist/jquery',
    'jquery.qtip': [
      '//cdn.jsdelivr.net/qtip2/2.2.1/jquery.qtip.min',
      'lib/qtip2/basic/jquery.qtip'
    ],
    raty: 'lib/raty/lib/jquery.raty',
    requirejs: 'lib/requirejs/require'
  },
  packages: [

  ]
});
