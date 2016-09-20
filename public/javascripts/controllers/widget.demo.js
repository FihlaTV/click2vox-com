define([
    'controllers/widget.mixin',
    'jquery',
    'clipboard',
    'bootstrap'
  ], function (WidgetMixin, $, Clipboard) {

  var WidgetDemoController = function ($scope, $http, $window, $controller) {
    // let's extend from the mixin first of all
    angular.extend(this, $controller(WidgetMixin, {$scope: $scope}));

    $scope.preview_webrtc_compatible = true;
    $scope.previewButton = true;
    $scope.previewDialpad = true;
    $scope.previewFullScreen = true;
    $scope.previewMute = false;
    $scope.widgetCode = '<div id="voxButton_574774ad1ce40fbf62562a22" data-button_id="574774ad1ce40fbf62562a22" data-text="Call Me!" data-redirect_url="https://voxbone.com" data-did="883510080144" data-dial_pad="true" data-context="context" data-send_digits="1,1200ms,2,1200ms,3,1200ms" data-caller_id="my_caller_id" data-incompatible_browser_configuration="link_button_to_a_page" data-show_frame="true" data-server_url="https://click2vox.com/" data-use_default_button_css="true" data-button_css_class_name="style-b" class="voxButton"></div><script src="https://click2vox.com/click2vox.js"></script>';
    $scope.tempButtonColor = "";
    $scope.tempFrameColor = "";

    $scope.master = {
      showWidgetCode: false,
      dial_pad: true,
      button_style: 'style-a',
      background_style: 'dark',
      show_text_html_value: '<h3>This is a placeholder for your message</h3>',
      incompatible_browser_configuration: 'hide_widget',
      show_frame: true,
      show_branding: true,
      test_setup: true
    };

    $scope.reset = function (form) {
      $scope.widget = angular.copy($scope.master);
    };

    $scope.init = function () {
      $scope.wirePluginAndEvents();
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

    $scope.reset();
    $scope.init();

    $scope.setTheme = function (theme) {
      if($scope.widget.frame_color)
        $scope.tempFrameColor = $scope.widget.frame_color;
      if($scope.widget.button_color)
        $scope.tempButtonColor = $scope.widget.button_color; 

      $scope.widget.frame_color = "";
      $scope.widget.button_color = "";
      if ($scope.widget.button_style != theme)
        $scope.widget.button_style = theme;
    };

    $scope.setCustomTheme = function() {
      $scope.tempFrameColor ? $scope.widget.frame_color = $scope.tempFrameColor : $scope.widget.frame_color = "black";
      $scope.widget.button_color = $scope.tempButtonColor;
    };
    
  };

  WidgetDemoController.$inject = ['$scope', '$http', '$window', '$controller'];

  return WidgetDemoController;
});
