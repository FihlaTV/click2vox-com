define([
    'jquery', 'clipboard'
  ], function($, Clipboard) {

  var WidgetControllerMixin = function($scope) {

    $scope.makeCall = function(did) {
      var ibc_value = $scope.widget.incompatible_browser_configuration;
      if (!$scope.preview_webrtc_compatible && (ibc_value === 'link_button_to_a_page')) {
        var redirect_url = $scope.widget.link_button_to_a_page_value || 'https://voxbone.com';
        window.open(redirect_url);
        return;
      }

      //adding widget Id to call logs
      now = new Date($.now());
      var call = {
        call: {
            'click2vox_widgetId': $scope.widget._id,
            'click2vox_callTime': now
        }
      };

      voxbone.WebRTC.webrtcLogs = voxbone.WebRTC.webrtcLogs.concat('\n'+JSON.stringify(call));

      var voxButtonElement = document.getElementById('voxButtonPreview');

      var didToCall = (typeof did === 'undefined') ? $scope.did : did;
      voxButtonElement.dataset.did = didToCall;
      voxButtonElement.dataset.rating = $scope.widget.rating;
      voxButtonElement.dataset.caller_id = $scope.widget.caller_id;
      voxButtonElement.dataset.context = $scope.widget.context;
      voxButtonElement.dataset.dial_pad = $scope.widget.dial_pad ;
      voxButtonElement.dataset.send_digits = $scope.widget.send_digits;
      voxButtonElement.dataset.ringback = $scope.widget.ringback;
      var launch_call_button = document.getElementById('launch_call');
      if (launch_call_button)
        launch_call_button.click();
    };

    $scope.wirePluginAndEvents = function () {
      $('[data-toggle="tooltip"]').tooltip();

      $(".title-toggle").click(function () {
        $(this).parent().toggleClass("active");
      });

      $(".togle-bg a.dark").click(function () {
        $(".prev-view").removeClass("light").removeClass("grey").addClass("dark");
      });

      $(".togle-bg a.grey").click(function () {
        $(".prev-view").removeClass("light").removeClass("black").addClass("grey");
      });

      $(".togle-bg a.light").click(function () {
        $(".prev-view").removeClass("black").removeClass("grey").addClass("light");
      });

      $('.codebox-actions a').click(function (e) {
        e.preventDefault();
      });

      var clipboard = new Clipboard('#clipboard_copy');
      clipboard.on('success', function (e) {
        console.info('Action:', e.action);
        console.info('Text:', e.text);
        console.info('Trigger:', e.trigger);
        e.clearSelection();
      });

      clipboard.on('error', function (e) {
        console.error('Action:', e.action);
        console.error('Trigger:', e.trigger);
      });
    };
  };

  WidgetControllerMixin.$inject = ['$scope'];

  return WidgetControllerMixin;
});
