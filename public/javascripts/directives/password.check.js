define(function () {
  var passwordCheckDirective = function ($timeout) {
    return {
      require: 'ngModel',
      link: function (scope, elem, attrs, ctrl) {
        var firstPassword = '#' + attrs.pwCheck;
        elem.add(firstPassword).on('keyup', function () {
          scope.$apply(function () {
            var pwVerify = elem.val() === $(firstPassword).val();
            ctrl.$setValidity('pwmatch', pwVerify);
          });
        });
      }
    };
  };

  return passwordCheckDirective;
});