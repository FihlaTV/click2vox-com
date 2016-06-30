define([
    'jquery',
    'jquery.qtip'
  ],
  function ($) {
    var qtipDirective = function () {
      return {
        restrict: 'A',
        scope: {
          qtipVisible: '=',
          qtipDisable: '='
        },

        link: function (scope, element, attrs) {
          var my = attrs.qtipMy || 'center right',
            at = attrs.qtipAt || 'center left',
            qtipClass = attrs.qtipClass || 'qtip-bootstrap',
            content = attrs.qtipContent || attrs.qtip;

          if (attrs.qtipTitle) {
            content = {
              'title': attrs.qtipTitle,
              'text': attrs.qtip
            };
          }

          $(element).qtip({
            content: content,
            position: {
              my: my,
              at: at,
              target: element
            },
            hide: {
              fixed: true,
              delay: 100
            },
            style: qtipClass
          });

          if (attrs.qtipVisible) {
            scope.$watch('qtipVisible', function (newValue, oldValue) {
              $(element).qtip('toggle', newValue);
            });
          }

          if (attrs.qtipDisable) {
            scope.$watch('qtipDisable', function (newValue, oldValue) {
              $(element).qtip('disable', newValue);
            });
          }
        }
      };
    };

    return qtipDirective;
  }
);
