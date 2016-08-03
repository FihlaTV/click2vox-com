define(['jquery', 'clipboard', 'bootstrap'], function ($, Clipboard) {

  var WidgetAddController = function ($scope, $http, $window, $cookies) {
    $scope.preview_webrtc_compatible = true;

    $scope.onClickTab = function (is_preview_webrtc_compatible) {
      $scope.preview_webrtc_compatible = is_preview_webrtc_compatible;
    };

    $scope.master = {
      showWidgetCode: false,
      dial_pad: true,
      button_style: 'style-a',
      background_style: 'dark',
      demoCode: '<div id="voxButton_574774ad1ce40fbf62562a22" data-button_id="574774ad1ce40fbf62562a22" data-text="Call Me!" data-redirect_url="https://voxbone.com" data-did="883510080144" data-dial_pad="true" data-context="context" data-send_digits="1,1200ms,2,1200ms,3,1200ms" data-caller_id="my_caller_id" data-incompatible_browser_configuration="link_button_to_a_page" data-show_frame="true" data-server_url="https://click2vox.com/" data-use_default_button_css="true" data-button_css_class_name="style-b" class="voxButton"></div><script src="https://click2vox.com/click2vox.js"></script>',
      show_text_html_value: '<h3>This is a placeholder for your message</h3>',
      incompatible_browser_configuration: 'hide_widget'
    };

    $scope.eventHandlers = {
      'localMediaVolume': function (e) {
        //- console.log('Microphone Volume ->' + e.localVolume);
        if (voxbone.WebRTC.isMuted) return;

        $("#microphone em").removeClass();
        if (e.localVolume > 0.01) $("#mic1").addClass('on');
        if (e.localVolume > 0.05) $("#mic2").addClass('on');
        if (e.localVolume > 0.10) $("#mic3").addClass('on');
        if (e.localVolume > 0.20) $("#mic4").addClass('on');
        if (e.localVolume > 0.30) $("#mic5").addClass('peak');
      },
      'progress': function (e) {
        console.log('Calling...');
        $("#vw-title").text("Calling");
        $("#audio-ringback-tone").trigger('play');
      },
      'failed': function (e) {
        console.log('Failed to connect: ' + e.cause);
        $("#audio-ringback-tone").trigger('pause');

        if (e.cause.trim().toLowerCase() != 'authentication error')
          $("#vw-title").text("Call Failed: " + e.cause.substr(0, 11));
        else
          $("#vw-title").text("Call Failed: Token Expired");

        $("#vw-in-call").addClass('hidden');
        $(".vw-animated-dots").addClass('hidden');

        $("#vw-rating-after-message").removeClass('hidden');
      },
      'accepted': function (e) {
        console.log('Call started');
        $("#audio-ringback-tone").trigger('pause');
        $("#vw-title").text("In Call");
        $(".vw-animated-dots").removeClass('hidden');
        $("#vw-unable-to-acces-mic").addClass('hidden');
      },
      'ended': function (e) {
        console.log('Call ended');
        $("#audio-ringback-tone").trigger('pause');
        $("#vw-title").text("Call Ended");
        $(".vw-animated-dots").addClass('hidden');
        $("#vw-in-call").addClass('hidden');
        $("#vw-rating").removeClass('hidden');
        $(".vw-end-call").click();
      },
      'getUserMediaFailed': function (e) {
        console.log('Cannot get User Media');
        $("#audio-ringback-tone").trigger('pause');
        $("#vw-title").text("Call Failed");
        $(".vw-animated-dots").addClass('hidden');
        $("#vw-in-call").addClass('hidden');
        $("#vw-unable-to-acces-mic").removeClass('hidden');
      },
      'getUserMediaAccepted': function (e) {
        console.log('local media accepted');
        $("#vw-title").text("Calling");
        $("#audio-ringback-tone").trigger('play');
        voxbone.Logger.loginfo("local media accepted");
      },
      'authExpired': function (e) {
        console.log('Auth Expired!');
        $scope.getVoxrtcConfig(function (data) {
          voxbone.WebRTC.init(data);
        });
      }
    };

    $scope.reset = function (form) {
      $scope.widget = angular.copy($scope.master);
    };

    $scope.init = function () {
      $scope.wirePluginAndEvents();

      if(!$scope.isWebRTCSupported())
        return;

      voxbone.WebRTC.configuration.post_logs = true;
      voxbone.WebRTC.authServerURL = "https://webrtc.voxbone.com/rest/authentication/createToken";
      voxbone.WebRTC.customEventHandler = $scope.eventHandlers;
      $scope.getVoxrtcConfig(function (data) {
        voxbone.WebRTC.init(data);
      });
    };

    $scope.getVoxrtcConfig = function (callback) {
      $.get('/token_config', function (data) {
        callback(eval('(' + data + ')'));
      });
    };

    $scope.isWebRTCSupported = function () {
      return voxbone.WebRTC.isWebRTCSupported();
    };

    $scope.showCallButton = function () {
      var ibc_value = $scope.widget.incompatible_browser_configuration;
      return $scope.preview_webrtc_compatible || (ibc_value === 'link_button_to_a_page');
    };

    $scope.getHiddenButtonText = function () {
      switch ($scope.widget.incompatible_browser_configuration) {
      case 'hide_widget':
        return "";
      case 'show_text_html':
        return $scope.widget.show_text_html_value;
      }
    };

    $scope.isInCall = function () {
      return (typeof voxbone.WebRTC.rtcSession.isEstablished === "function") && !voxbone.WebRTC.rtcSession.isEnded();
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

      $("#hangup_call").click(function (e) {
        e.preventDefault();
        voxbone.WebRTC.hangup();
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

    $scope.makeCall = function (did) {
      if (this.isInCall()) return;

      if (!this.preview_webrtc_compatible && (this.widget.incompatible_browser_configuration === 'link_button_to_a_page')) {
        $window.open(this.widget.link_button_to_a_page_value, '_blank');
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

        voxbone.WebRTC.call(did);
        window.onbeforeunload = function (e) {
          voxbone.WebRTC.unloadHandler();
        };
      }
    };

    $scope.reset();
    $scope.init();

    $scope.setTheme = function (theme) {
      if ($scope.widget.button_style != theme)
        $scope.widget.button_style = theme;
    };
  };

  WidgetAddController.$inject = ['$scope', '$http', '$window'];

  return WidgetAddController;
});
