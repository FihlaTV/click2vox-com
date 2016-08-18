define(['jquery', 'bootstrap'], function($) {

  var DeleteWidgetController = function($scope, $http, $window, $timeout, $rootScope) {
    $scope.confirmText = 'Confirm';
    $scope.submitting = false;

    $rootScope.$on('openDeleteModal', function(event, widgetID) {
      $scope.dialog = $('#deleteWidgetModal');
      $scope.widgetID = widgetID;
      $scope.dialog.modal('show');
    });

    $scope.deleteWidget = function(form) {
      this.confirmText = 'Deleting...';
      $scope.submitting = true;

      var req = {
        method: 'DELETE',
        url: '/widget/' + $scope.widgetID,
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

  DeleteWidgetController.$inject = ['$scope', '$http', '$window', '$timeout', '$rootScope'];

  return DeleteWidgetController;
});