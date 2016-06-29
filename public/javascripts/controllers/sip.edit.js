define(['jquery', 'bootstrap'], function (jQuery) {

  var EditSIPController = function ($scope, $http, $window, $timeout) {

    $scope.reset = function () {
      this.sipChanged = false;
      this.errorMessage = '';
      this.submitText = 'Save SIP URI';
      this.saving = false;
    };

    $scope.bindEvents = function () {
      $('#editSIPModal').on('hidden.bs.modal', function () {
        $scope.reset();
      });
    },

    $scope.reset();
    $scope.bindEvents();

    $scope.$watch('sip_uri', function () {
      var initialValue = $('input[name="sip_uri"]').data('original');
      var currentValue = $scope.sipEditForm.sip_uri.$viewValue;

      if (!initialValue)
        return false;

      $scope.sipChanged = (initialValue !== currentValue);
    });

    $scope.saveSipURI = function () {
      this.errorMessage = null;
      this.submitText = 'Loading...';
      this.saving = true;

      var originalSip = $('input[name="sip_uri"]').data('original');

      if (this.sipEditForm.$valid) {
        var req = {
          method: 'POST',
          url: '/sip/edit',
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          },
          data: {
            sip_uri: $scope.sip_uri,
            original: originalSip
          }
        };

        $http(req)
          .then(function successCallback(response) {
            $scope.successMessage = response.data.message;
            $scope.submitText = 'Redirecting...';
            $scope.saving = false;

            $timeout(function() {
              $('#editSIPModal').modal('hide');
              $window.location.reload();
            }, 2000);

          }, function errorCallback(response) {
            $scope.saving = false;
            $scope.submitText = 'Save SIP URI';
            $scope.errorMessage = response.data.message;
          });
      }
    };

  };

  EditSIPController.$inject = ['$scope', '$http', '$window', '$timeout'];

  return EditSIPController;
});
