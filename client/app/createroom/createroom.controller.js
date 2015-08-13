'use strict';

angular.module('shrdApp')
  .controller('CreateroomCtrl', function ($scope, $http, $location) {

    $scope.formData = {

    };




    $scope.submitRoom = function (data) {
      console.log("data", data);

      $http.post('/api/rooms', { name: data.name, game: data.gameName })
        .success(function (data) {
          console.log("data", data);
          console.log("$location", $location);
          $location.path('/room/'+data._id);

        });

    }
  });
