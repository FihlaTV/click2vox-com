define(['jquery', 'bootstrap'], function($) {

  var DeleteSIPController = function ($scope, $http, $window, $timeout, $rootScope) {
    $scope.confirmText = 'Confirm';
    $scope.submitting = false;

    $rootScope.$on('deleteSIPURI', function(event, sip_uri) {
      $scope.dialog = $('#deleteSipModal');
      $scope.sipID = sip_uri;
      $scope.dialog.modal('show');
    });

    $scope.deleteSip = function(form) {
      this.confirmText = 'Deleting...';
      $scope.submitting = true;

      var req = {
        method: 'DELETE',
        url: '/sip/' + $scope.sipID,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      };

      $http(req)
        .then(function successCallback(resp) {
          var data = resp.data;
          $scope.successMessage = data.msg;

          $timeout(function() {
            $scope.dialog.modal('hide');

            $window.location.reload();
          }, 2000);

        }, function errorCallback(resp) {
          console.log('Error: ', resp);
          var data = resp.data;
          $scope.errorMessage = data.msg;
          $scope.confirmText = 'Confirm';
          $scope.submitting = false;
        });
    };

  };

  DeleteSIPController.$inject = ['$scope', '$http', '$window', '$timeout', '$rootScope'];

  return DeleteSIPController;
});
