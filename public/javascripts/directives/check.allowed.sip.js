define(function () {
  var checkAllowedSip = function () {
    return {
      require: 'ngModel',
      link: function (scope, elem, attrs, ctrl) {
        ctrl.$parsers.unshift(function(value) {
          var NOT_ALLOWED = ['echo@ivrs', 'digits@ivrs'];
          ctrl.$setValidity('notallowed', NOT_ALLOWED.indexOf(value) === -1);
          return value;
        });
      }
    };
  };

  return checkAllowedSip;
});