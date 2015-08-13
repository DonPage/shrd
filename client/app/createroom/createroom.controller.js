'use strict';

angular.module('shrdApp')
  .controller('CreateroomCtrl', function ($scope) {
    $scope.message = 'Hello';

    $scope.formData = {

    };




    $scope.submitRoom = function (data) {
      console.log("data", data);

    }
  });
