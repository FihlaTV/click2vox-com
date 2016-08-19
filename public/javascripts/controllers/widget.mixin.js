define(function(Clipboard) {

  var WidgetControllerMixin = function($scope) {

    $scope.makeCall = function(did) {
      var voxButtonElement = document.getElementById('voxButtonPreview');

      var didToCall = (typeof did === 'undefined') ? $scope.did : did;
      voxButtonElement.dataset.did = didToCall;

      var launch_call_button = document.getElementById('launch_call');
      if (launch_call_button)
        launch_call_button.click();
    };
  };

  WidgetControllerMixin.$inject = ['$scope'];

  return WidgetControllerMixin;
});
