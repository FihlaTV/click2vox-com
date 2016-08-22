define(function(Clipboard) {

  var WidgetControllerMixin = function($scope) {

    $scope.makeCall = function(did) {
      var ibc_value = $scope.widget.incompatible_browser_configuration;
      if (!$scope.preview_webrtc_compatible && (ibc_value === 'link_button_to_a_page')) {
        var redirect_url = $scope.widget.link_button_to_a_page_value || 'https://voxbone.com';
        window.open(redirect_url);
        return;
      };

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
