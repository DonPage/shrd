'use strict';

angular.module('shrdApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/createroom', {
        templateUrl: 'app/createroom/createroom.html',
        controller: 'CreateroomCtrl',
        resolve: {

          games: function ($q, $http) {
            return $http.get('/api/ShrdGames')
              .then(function (games) { return games.data });

          }
        }
      });
  });
