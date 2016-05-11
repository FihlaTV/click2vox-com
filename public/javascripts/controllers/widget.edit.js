define(['jquery', 'clipboard', 'bootstrap'], function ($, Clipboard) {

  var WidgetEditController = function ($scope, $http, $window, $cookies) {
    $scope.sipUriLinked = false;
    $scope.preview_webrtc_compatible = true;

    $scope.onClickTab = function (is_preview_webrtc_compatible) {
      $scope.preview_webrtc_compatible = is_preview_webrtc_compatible;
    };

    $scope.master = {
      showWidgetCode: false,
      dial_pad: true,
      button_style: 'style-a',
      background_style: 'dark',
      widget_code: 'Select from the SIP URI field the Echo Service (echo@ivrs), Digits Service (digits@ivrs) or enter your SIP URI to Generate the code snippet',
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

    $scope.prepareHtmlForCodepen = function (data) {
      return data.replace(/"/g, "'");
    };

    $scope.reset = function (form) {
      if (form) {
        form.$setPristine();
        form.$setUntouched();
      }

      var cookie_data = $cookies.getObject('widget_data');

      if (cookie_data) {
        $scope.sipUriLinked = true;
        for (var attrname in cookie_data)
          $scope.master[attrname] = cookie_data[attrname];
        //- $scope.createMakeCallToolip();
      }

      $scope.widget = angular.copy($scope.master);
    };

    $scope.init = function () {
      $scope.wirePluginAndEvents();

      voxbone.WebRTC.configuration.post_logs = true;
      voxbone.WebRTC.authServerURL = "https://webrtc.voxbone.com/rest/authentication/createToken";
      voxbone.WebRTC.customEventHandler = $scope.eventHandlers;
      $scope.getVoxrtcConfig(function (data) {
        voxbone.WebRTC.init(data);
      });
    };

    // watch for initial widget data
    $scope.$watch('initData', function () {
      $scope.widget = angular.extend(
        {}, $scope.widget, $scope.master,
        $scope.initData['widget']
      );

      $scope.did = $scope.initData['did'];
    });

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
      return $scope.preview_webrtc_compatible || (ibc_value == 'link_button_to_a_page');
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

    $scope.makeCall = function () {
      if ($scope.isInCall()) return;

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

        voxbone.WebRTC.call($scope.did);
        window.onbeforeunload = function (e) {
          voxbone.WebRTC.unloadHandler();
        };
      }
    };

    $scope.reset();
    $scope.init();

    $scope.widget.setTheme = function (theme) {
      if ($scope.widget.button_style != theme)
        $scope.widget.button_style = theme;
    };

    $scope.widget.generateOutputCode = function () {
      if (!$scope.sipUriLinked) return;
      console.log("--> Generating Output Code...");

      var caller_id = $scope.widget.caller_id;
      if (caller_id)
        caller_id = caller_id.replace(/[^a-zA-Z0-9-_]/g, '');

      var data = $scope.widget;
      data['caller_id'] = caller_id;

      var ibc = $scope.widget.incompatible_browser_configuration;
      if (ibc == 'hide_widget')
        data['hide_widget'] = true;
      else if (ibc == 'link_button_to_a_page')
        data['link_button_to_a_page'] = $scope.widget.link_button_to_a_page_value;
      else if (ibc == 'show_text_html')
        data['show_text_html'] = $scope.widget.show_text_html_value;

      var req = {
        method: 'POST',
        url: '/widget/' + $scope.widget._id + '/edit',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        data: data
      };

      $http(req)
        .then(function successCallback(response) {
            $('#generate-output-code')[0].text = "Regenerate Code";
            $scope.widget.showWidgetCode = true;
            $scope.widget.widget_code = response.data.widget_code;

            $('#alert-success')
              .css('display', 'block')
              .html('Your configuration has been saved successfully');
            $window.scrollTo(0, 0);
          },
          function errorCallback() {
            $scope.widget.showWidgetCode = false;
            console.log("entered error callback");
          });
    };

    $scope.conditional_sip_provisioning = function (form) {
      if (!$scope.sipUriLinked)
        $scope.sip_provisioning(form);
    };

    $scope.sip_provisioning = function (form) {
      $scope.sipUriLinked = false;
      $scope.widget.showWidgetCode = false;
      $scope.widget.widget_code = 'Generating code snippet...';
      $scope.widget_form.sip_provisioning = true;
      $scope.widget_form.sip_provisioned = false;
      $scope.widget_form.cannot_validate_sip_uri = '';

      if (form.$valid) {
        var req = {
          method: 'POST',
          url: '/sip_provisioning',
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          },
          data: {
            sip_uri: $scope.widget.sip_uri
          }
        };

        $http(req)
          .then(function successCallback(response) {
            $scope.widget.showWidgetCode = true;
            $scope.sipUriLinked = true;
            $scope.widget_form.cannot_validate_sip_uri = '';
            $scope.widget_form.sip_provisioning = false;
            $scope.widget_form.sip_provisioned = true;
          }, function errorCallback(response) {
            console.log("Error: ");
            console.log(response.data);
            $scope.widget.widget_code = 'Error generating widget code snippet. Please check it.';

            if (response.data && response.data.errors && response.data.errors.comeback_errors && response.data.errors.comeback_errors.apiErrorMessage)
              $scope.widget_form.cannot_validate_sip_uri = response.data.errors.comeback_errors.apiErrorMessage;
            else
              $scope.widget_form.cannot_validate_sip_uri = "Unexpected error linking your SIP URI. Please try again. ";

            $scope.widget_form.sip_provisioning = false;
            $scope.widget_form.sip_provisioned = false;
          });
      } else {
        $scope.widget_form.sip_provisioning = false;
        $scope.widget_form.sip_provisioned = false;
        $scope.widget_form.sip_uri.$error.pattern = true;
      }
    };
  };

  WidgetEditController.$inject = ['$scope', '$http', '$window', '$cookies'];

  return WidgetEditController;
});