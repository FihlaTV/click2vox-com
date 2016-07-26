define(['jquery'], function($, Clipboard) {

  var WidgetControllerMixin = function($scope) {

    $scope.makeCall = function(did) {

      if ($scope.isInCall()) return;

      var didToCall = (typeof did === 'undefined') ? $scope.did : did;

      if (!$scope.preview_webrtc_compatible && ($scope.widget.incompatible_browser_configuration == 'link_button_to_a_page')) {
        $window.open($scope.widget.link_button_to_a_page_value, '_blank');
        return;
      }

      if ($scope.isWebRTCSupported()) {
        $("#vw-title").text("Waiting for User Media");
        $("#microphone em").removeClass('on').removeClass('off');
        $("#vw-unable-to-acces-mic").addClass('hidden');
        $(".vw-animated-dots").removeClass('hidden');
        $(".vox-widget-wrapper").removeClass('hidden');
        $("#vw-in-call").removeClass('hidden');
        $(".vw-rating").addClass('hidden');

        if ($scope.widget.dial_pad)
          $("#dialpad").removeClass('hidden');
        else
          $("#dialpad").addClass('hidden');

        var caller_id = $scope.widget.caller_id ? $scope.widget.caller_id : "click2vox";
        voxbone.WebRTC.configuration.uri = (new JsSIP.URI(scheme = "sip", user = (caller_id).replace(/[^a-zA-Z0-9-_]/g, ''), "voxbone.com")).toString();

        if ($scope.widget.context)
          voxbone.WebRTC.context = $scope.widget.context;

        if ($scope.widget.send_digits) {
          console.log('Digits to be send: ' + $scope.widget.send_digits);
          voxbone.WebRTC.configuration.dialer_string = $scope.widget.send_digits;
        }

        voxbone.WebRTC.call(didToCall);
        window.onbeforeunload = function(e) {
          voxbone.WebRTC.unloadHandler();
        };
      }
    };
  };

  WidgetControllerMixin.$inject = ['$scope'];

  return WidgetControllerMixin;
});
