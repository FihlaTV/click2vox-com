define([
    'controllers/widget.mixin',
    'jquery',
    'clipboard',
    'bootstrap'
  ], function (WidgetMixin, $, Clipboard) {

  var WidgetEditController = function ($scope, $http, $window, $controller) {
    // let's extend from the mixin first of all
    angular.extend(this, $controller(WidgetMixin, {$scope: $scope}));

    $scope.preview_webrtc_compatible = true;
    $scope.previewButton = true;
    $scope.previewDialpad = true;
    $scope.previewFullScreen = true;
    $scope.previewMute = false;
    $scope.submitText = 'Save Configuration';
    $scope.tempButtonColor = "";
    $scope.tempFrameColor = "";

    $scope.master = {
      showWidgetCode: true,
      dial_pad: true,
      button_style: 'style-a',
      background_style: 'dark',
      widgetCode: 'Select from the SIP URI field the Echo Service (echo@ivrs), Digits Service (digits@ivrs) or enter your SIP URI to Generate the code snippet',
      show_text_html_value: '<h3>This is a placeholder for your message</h3>',
      incompatible_browser_configuration: 'hide_widget',
      shouldProvision: false
    };

    $scope.prepareHtmlForCodepen = function (data) {
      return (data ? data.replace(/"/g, "'") : '');
    };

    $scope.reset = function (form) {
      if (form) {
        form.$setPristine();
        form.$setUntouched();
      }

      $scope.widget = angular.copy($scope.master);
    };

    $scope.init = function () {
      $scope.wirePluginAndEvents();
    };

    $scope.loadWidgetData = function () {
      var data = $scope.initData;
      $scope.savedSuccessfully = false;

      $scope.widget = angular.extend({}, $scope.widget, $scope.master, data.widget);
      $scope.widgetCode = data.widgetCode;
      $scope.currentSip = data.currentSip;
      $scope.did = data.did;
      $scope.widget.link_button_to_a_page_value = $scope.widget.link_button_to_a_page;
      $scope.widget.show_text_html_value = $scope.widget.show_text_html;
    };

    // watch for initial widget data
    $scope.$watch('initData', function () {
      $scope.loadWidgetData();
    });

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

    $scope.reset();
    $scope.init();

    $scope.setTheme = function (theme) {
      if($scope.widget.frame_color)
        $scope.tempFrameColor = $scope.widget.frame_color;
      if($scope.widget.button_color)
        $scope.tempButtonColor = $scope.widget.button_color;

      $scope.widget.frame_color = "";
      $scope.widget.button_color = "";
      if ($scope.widget.button_style !== theme) {
        $scope.widget.button_style = theme;
        $scope.sipDirty = false;
        $scope.widget_form.$setDirty();
      }
    };

    $scope.setCustomTheme = function() {
      if($scope.tempFrameColor)
        $scope.widget.frame_color = $scope.tempFrameColor;
      if($scope.tempButtonColor)
        $scope.widget.button_color = $scope.tempButtonColor;
    };

    $scope.discardConfiguration = function (form) {
      form.$setPristine();
      $scope.loadWidgetData();
    };

    $scope.saveConfiguration = function (type) {
      var embedType = (typeof(type) === 'undefined') ? 'div' : type;

      if (!$scope.widget.sip_uri) return;
      console.log("--> Generating Output Code...");

      $scope.submitText = 'Loading...';
      $scope.savingConfig = true;
      $scope.savedSuccessfully = false;
      $scope.widget_form.cannotValidateSipUri = null;

      var caller_id = $scope.widget.caller_id;
      if (caller_id)
        caller_id = caller_id.replace(/[^a-zA-Z0-9-_]/g, '');

      var data = $scope.widget;
      data.caller_id = caller_id;
      data.type = embedType;

      var ibc = $scope.widget.incompatible_browser_configuration;
      if (ibc === 'hide_widget')
        data.hide_widget = true;
      else if (ibc === 'link_button_to_a_page')
        data.link_button_to_a_page = $scope.widget.link_button_to_a_page_value;
      else if (ibc === 'show_text_html')
        data.show_text_html = $scope.widget.show_text_html_value;

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
            $scope.widget.showWidgetCode = true;
            $scope.widgetCode = response.data.widget_code;
            $scope.savedSuccessfully = true;

            $scope.currentSip = $scope.widget.sip_uri;
            $scope.submitText = 'Save Configuration';
            $scope.savingConfig = false;

            $scope.did = response.data.didToCall;
            $scope.initData.currentSip = $scope.currentSip;
            $scope.widget_form.$setPristine();
          },
          function errorCallback(response) {
            var data = response.data;
            console.log("Error: ", data);

            $scope.submitText = 'Save Configuration';
            $scope.savingConfig = false;
            $scope.widgetCode = 'Error generating widget code snippet. Please check it.';
            $scope.widget_form.cannotValidateSipUri = data.errors;
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

  WidgetEditController.$inject = ['$scope', '$http', '$window', '$controller'];

  return WidgetEditController;
});
