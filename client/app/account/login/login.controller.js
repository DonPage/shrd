'use strict';

angular.module('shrdApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, $window, localStorage) {
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function (form) {
      $scope.submitted = true;

      if (form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
          .then(function () {
            // See if user has a redirect in local storage, if not then redirect them to home.
            localStorage.read('redirect', function (value) {

              if (!value) {
                $location.path('/');
              }

              $location.path(value);

            });

            //$location.path('/');
          })
          .catch(function (err) {
            $scope.errors.other = err.message;
          });
      }
    };

    $scope.loginOauth = function (provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
