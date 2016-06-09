define(['jquery', 'bootstrap'], function (jQuery) {

  var AddSIPController = function ($scope, $http, $window, $timeout) {

    $scope.reset = function () {
      this.onSubmitting = false;
      this.errorMessage = '';
      this.successMessage = '';
      this.submitText = 'Add your new SIP';
      this.skipText = 'Skip for now';
    };

    $scope.init = function () {
      this.wirePlugins();
      this.reset();
    };

    $scope.wirePlugins = function () {
      jQuery('[data-toggle="tooltip"]').tooltip();
    };

    $scope.skipURI = function (redirect_to) {
      $window.location.href = redirect_to;
    };

    $scope.saveSipURI = function (form) {
      this.reset();
      this.successMessage = 'Provisioning SIP URI...';
      this.onSubmitting = true;
      this.submitText = 'Loading...';

      if (form.$valid) {
        var req = {
          method: 'POST',
          url: '/sip/new',
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          },
          data: {
            sip_uri: $scope.sip.uri
          }
        };

        $http(req)
          .then(function successCallback(response) {
            $scope.successMessage = 'SIP provisioned. Redirecting...';
            $timeout(function() {
              $window.location.href = response.data.redirect_to;
            }, 100);

          }, function errorCallback(response) {
            var errors = response.data.errors || {};
            $scope.submitText = 'Add SIP';
            $scope.onSubmitting = false;
            console.log('Error: ', response.data);

            if (response.data && errors && errors.comeback_errors && errors.comeback_errors.apiErrorMessage)
              $scope.errorMessage = errors.comeback_errors.apiErrorMessage;
            else
              $scope.errorMessage = 'Unexpected error linking your SIP URI. Please try again.';
          });
      }
    };

  };

  AddSIPController.$inject = ['$scope', '$http', '$window', '$timeout'];

  return AddSIPController;
});
