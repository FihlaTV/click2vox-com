define(['jquery', 'clipboard'], function ($, Clipboard) {

  var WidgetListController = function ($scope, $http, $window) {
    $scope.copyCode = function (widget_id) {
      $.get("/voxbone_widget/v2/" + widget_id, function(data) {
        var clipboard = new Clipboard('.clipboard', {
          text: function() {
            return data;
          }
        });

        clipboard.on('success', function(event) {
          event.clearSelection();
          event.trigger.textContent = 'Copied!';
          window.setTimeout(function() {
            event.trigger.textContent = 'Copy Code';
          }, 2500);
        });

      })
      .fail(function() {
        alert( "Error Copying Widget Code" );
      });
    };
  };

  return WidgetListController;
});
