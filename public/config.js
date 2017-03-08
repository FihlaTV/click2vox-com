require.config({
  baseUrl: '/javascripts/',
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
    'angular-recaptcha': {
      deps: ['angular'], init: function () {
        return 'vcRecaptcha';
      }
    },
    'angular-sanitize': {
      deps: ['angular'], init: function () {
        return 'ngSanitize';
      }
    },
    'angular-bootstrap-colorpicker': {
      deps: ['angular'], init: function () {
        return 'colorpicker.module';
      }
    },
  },
  paths: {
    angular: [
      '//ajax.googleapis.com/ajax/libs/angularjs/1.4.12/angular.min',
      '/lib/angular/angular.min'
    ],
    'angular-cookies': [
      '//ajax.googleapis.com/ajax/libs/angularjs/1.4.12/angular-cookies.min',
      '/lib/angular-cookies/angular-cookies.min'
    ],
    'angular-recaptcha': [
      '//cdnjs.cloudflare.com/ajax/libs/angular-recaptcha/3.0.3/angular-recaptcha.min',
      '/lib/angular-recaptcha/release/angular-recaptcha.min'
    ],
    'angular-sanitize': [
      '//ajax.googleapis.com/ajax/libs/angularjs/1.4.12/angular-sanitize.min',
      '/lib/angular-sanitize/angular-sanitize.min'
    ],
    'angular-bootstrap-colorpicker': [
      '//cdnjs.cloudflare.com/ajax/libs/angular-bootstrap-colorpicker/3.0.25/js/bootstrap-colorpicker-module.min',
      '/lib/angular-bootstrap-colorpicker/js/bootstrap-colorpicker-module.min'
    ],
    bootstrap: [
      '//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min',
      '/lib/bootstrap/dist/js/bootstrap.min'
    ],
    clipboard: [
      '//cdnjs.cloudflare.com/ajax/libs/clipboard.js/1.5.5/clipboard.min',
      '/lib/clipboard/dist/clipboard.min'
    ],
    jquery: '/lib/jquery/dist/jquery.min',
    'jquery.qtip': [
      '//cdn.jsdelivr.net/qtip2/2.2.1/jquery.qtip.min',
      '/lib/qtip2/basic/jquery.qtip.min'
    ],
    raty: [
      '//cdnjs.cloudflare.com/ajax/libs/raty/2.7.0/jquery.raty.min',
      '/lib/raty/lib/jquery.raty'
    ],
    widget: '/javascripts/widget',
    domReady: '/lib/domReady/domReady',
    requirejs: '/lib/requirejs/require',
    detectRTC: [
      '//cdn.voxbone.com/lib/DetectRTC',
      '//cdn.rawgit.com/muaz-khan/DetectRTC/master/DetectRTC'
    ]
  },
  packages: [
    "controllers",
    "directives"
  ]
});

// this is just to "preload" stuff
require(['angular', 'jquery']);
