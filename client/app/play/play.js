'use strict';

angular.module('shrdApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/play/:roomID', {
        templateUrl: 'app/play/play.html',
        controller: 'PlayCtrl',
        resolve: {
          roomData: function ($q, $http, $location) {
            return $http.get('/api/rooms/' + $location.$$path.split('/')[2])
              .success(function (data) {
                console.log("data:", data);
                return data;
              })

          }
        }
      });
  });
