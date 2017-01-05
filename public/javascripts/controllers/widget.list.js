define(['jquery', 'clipboard', 'bootstrap'], function ($, Clipboard) {

  var WidgetListController = function ($scope, $http, $window, $rootScope) {
    var clipboard = new Clipboard('.clipboard', {
      text: function(trigger) {
        return trigger.getAttribute('widget-code');
      }
    });

    clipboard.on('success', function(event) {
      event.clearSelection();
      event.trigger.textContent = 'Copied!';
      window.setTimeout(function() {
        event.trigger.textContent = 'Copy Code';
      }, 2500);
    });

    $scope.openDeleteSIPURIModal = function (sipUri) {
      $rootScope.$broadcast('deleteSIPURI', sipUri);
    };

    $scope.openDeleteWidgetModal = function (widgetID) {
      $rootScope.$broadcast('deleteWidget', widgetID);
    };

    $scope.openRequestUpgradeModal = function (isUpgradeAlreadyRequested) {
      $scope.dialog = $('#myModal');
      $scope.dialog.modal('show');

      if (!isUpgradeAlreadyRequested) {
        var req = {
          method: 'POST',
          url: '/account/upgrade_request'
        };

        $http(req)
          .then(function successCallback(response) {
            // $("#upgrade_request").hide();
          }, function errorCallback(response) {
            console.log('Error: ', response.data);
          });
      }
    };

    $scope.init = function () {
      this.modalEdit = $('#editSIPModal');

      this.modalEdit.on('hidden.bs.modal', function () {
        $scope.modalEdit.find('input[name="sip_uri"]').val('');
      });
    };

    $scope.editSIPURI = function (sipURI) {
      this.modalEdit.find('input[name="sip_uri"]')
        .data('original', sipURI)
        .val(sipURI);

      this.modalEdit.modal('show');
      return false;
    };

    $scope.init();
  };

  WidgetListController.inject = ['$scope', '$http', '$window', '$rootScope'];

  return WidgetListController;
});
