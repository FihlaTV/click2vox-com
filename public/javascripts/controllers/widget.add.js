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
    $scope.previewButton = true;
    $scope.previewDialpad = true;
    $scope.previewFullScreen = true;
    $scope.previewMute = false;
    $scope.submitText = 'Save Configuration';
    $scope.widgetCode = 'You must setup your widget and save your configuration to get the button embed code. Select from the SIP URI field the Echo Service (echo@ivrs), Digits Service (digits@ivrs) or one of your SIP URIs to create the button';
    $scope.tempButtonColor = "";
    $scope.tempFrameColor = "";

    $scope.master = {
      showWidgetCode: false,
      dial_pad: true,
      button_style: 'style-a',
      frame_color: '',
      button_color: '',
      background_style: 'dark',
      show_text_html_value: '<h3>This is a placeholder for your message</h3>',
      incompatible_browser_configuration: 'hide_widget',
      show_frame: true,
      show_branding: true,
      test_setup: true,
      rating: true,
      ringback: true,
      placement: "bottom-right",
      https_popup: true
    };

    $scope.reset = function (form) {
      $scope.widget = angular.copy($scope.master);
    };

    $scope.init = function () {
      $scope.wirePluginAndEvents();
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
      $scope.widget.frame_color = $scope.tempFrameColor ? $scope.tempFrameColor : "black";
      $scope.widget.button_color = $scope.tempButtonColor;
    };

    $scope.discardConfiguration = function (form) {
      form.$setPristine();
      $scope.reset();
    };

    $scope.saveConfiguration = function () {
      console.log("--> Saving configuration...");
      $scope.submitText = 'Saving...';
      $scope.savingConfig = true;
      $scope.savedSuccessfully = false;
      $scope.widget_form.cannotValidateSipUri = null;

      var caller_id = $scope.widget.caller_id;
      if (caller_id)
        caller_id = caller_id.replace(/[^a-zA-Z0-9-_]/g, '');

      var data = $scope.widget;
      data.caller_id = caller_id;

      var ibc = $scope.widget.incompatible_browser_configuration;
      if (ibc === 'hide_widget')
        data.hide_widget = true;
      else if (ibc === 'link_button_to_a_page')
        data.link_button_to_a_page = $scope.widget.link_button_to_a_page_value;
      else if (ibc === 'show_text_html')
        data.show_text_html = $scope.widget.show_text_html_value;

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
