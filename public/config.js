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
    angular: [
      '//ajax.googleapis.com/ajax/libs/angularjs/1.4.9/angular.min',
      'lib/angular/angular.min'
    ],
    'angular-cookies': [
      '//ajax.googleapis.com/ajax/libs/angularjs/1.4.9/angular-cookies.min',
      'lib/angular-cookies/angular-cookies.min'
    ],
    'angular-sanitize': [
      '//ajax.googleapis.com/ajax/libs/angularjs/1.4.9/angular-sanitize.min',
      'lib/angular-sanitize/angular-sanitize.min'
    ],
    bootstrap: [
      '//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min',
      'lib/bootstrap/dist/js/bootstrap.min'
    ],
    clipboard: [
      '//cdnjs.cloudflare.com/ajax/libs/clipboard.js/1.5.5/clipboard.min',
      'lib/clipboard/dist/clipboard.min'
    ],
    jquery: [
      '//ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min',
      'lib/jquery/dist/jquery.min'
    ],
    'jquery.qtip': [
      '//cdn.jsdelivr.net/qtip2/2.2.1/jquery.qtip.min',
      'lib/qtip2/basic/jquery.qtip.min'
    ],
    raty: [
      '//cdnjs.cloudflare.com/ajax/libs/raty/2.7.0/jquery.raty.min',
      'lib/raty/lib/jquery.raty'
    ],
    requirejs: 'lib/requirejs/require'
  },
  packages: [

  ]
});
