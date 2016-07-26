define([
    'controllers/widget.mixin',
    'jquery',
    'clipboard',
    'bootstrap'
  ], function (WidgetMixin, $, Clipboard) {

  var WidgetAddController = function ($scope, $http, $window, $controller) {
    // let's extend from the mixin first of all
    angular.extend(this, $controller(WidgetMixin, {$scope: $scope}));

    $scope.preview_webrtc_compatible = true;
    $scope.submitText = 'Save Configuration';

    $scope.onClickTab = function (is_preview_webrtc_compatible) {
      $scope.preview_webrtc_compatible = is_preview_webrtc_compatible;
    };

    $scope.master = {
      showWidgetCode: false,
      dial_pad: true,
      button_style: 'style-a',
      background_style: 'dark',
      widget_code: 'You must setup you widget and save your configuration to get the button embed code. Select from the SIP URI field the Echo Service (echo@ivrs), Digits Service (digits@ivrs) or one of your SIP URIs to create the button',
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

    $scope.$watch('widget.sip_uri', function () {
      var addNewSipUri = ($scope.widget.sip_uri === 'Add a new SIP URI');
      var modal = $('.modal.add-new-modal');

      if (addNewSipUri && modal.length > 0) {
        modal.modal('show');
        modal.on('hidden.bs.modal', function () {
          // reset the dropdown
          delete $scope.widget.sip_uri;
          $scope.$digest();
        });
      } else
        delete $scope.widget.new_sip_uri;
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

      // TODO: pull this DID out, maybe in an ENV VAR
      $('#callVoxbone').click(function () {
        $scope.makeCall(883510080408);
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

    $scope.reset();
    $scope.init();

    $scope.setTheme = function (theme) {
      if ($scope.widget.button_style != theme)
        $scope.widget.button_style = theme;
    };

    $scope.discardConfiguration = function (form) {
      form.$setPristine();
      $scope.reset();
    };

    $scope.saveConfiguration = function () {
      console.log("--> Saving configuration...");
      $scope.submitText = 'Saving...';
      $scope.savingConfig = true;

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
        url: '/widget/new',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        data: data
      };

      $http(req)
        .then(function successCallback(response) {
            $window.location.href = response.data.redirect;
          },
          function errorCallback(response) {
            console.log(response);
            $scope.widget.showWidgetCode = false;
            $scope.submitText = 'Save Configuration';
            $scope.savingConfig = false;
            $scope.savingError = response.data.errors;
          });
    };

    $scope.$watchCollection('widget', function () {
      $scope.savingError = false;

      // TODO: convert this into a separate directive
      // right now this is really ugly
      if ($scope.widget.sip_uri === 'Add a new SIP URI') {
        if ($scope.widget.new_sip_uri && $scope.widget.new_sip_uri.length === 0)
          $scope.sipDirty = true;

        if (!$scope.widget.new_sip_uri)
          $scope.sipDirty = true;

        if ($scope.widget.new_sip_uri && $scope.widget_form.new_sip_uri.$valid)
          $scope.sipDirty = false;
      } else {
        if ($scope.sip_uri && $scope.sip_uri.length === 0 && $scope.widget_form.$dirty) {
          $scope.sipDirty = true;
        }

        if ($scope.widget.sip_uri && $scope.widget_form.sip_uri.$errors && !$scope.widget_form.sip_uri.$errors.notallowed) {
          $scope.sipDirty = false;
        }

        if ($scope.widget.sip_uri && $scope.widget_form.sip_uri.$valid)
          $scope.sipDirty = false;
      }
    });
  };

  WidgetAddController.$inject = ['$scope', '$http', '$window', '$controller'];

  return WidgetAddController;
});
