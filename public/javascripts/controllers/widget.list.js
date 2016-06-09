define(['jquery', 'clipboard'], function ($, Clipboard) {

  var WidgetListController = function ($scope, $http, $window) {
    var clipboard = new Clipboard('.clipboard', {
      text: function(trigger) {
        return trigger.getAttribute('widget-code');
      }
    });

    clipboard.on('success', function(event) {
      event.clearSelection();
      event.trigger.textContent = 'Copied!';
      window.setTimeout(function() {
        event.trigger.textContent = 'Copy Code';
      }, 2500);
    });
  };

  return WidgetListController;
});
