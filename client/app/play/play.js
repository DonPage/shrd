'use strict';

angular.module('shrd2App')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/play/:roomId', {
        templateUrl: 'app/play/play.html',
        controller: 'PlayController',
        controllerAs: 'player',
        resolve: {
          loggedIn(Auth, LocStorage, $location) {
            Auth.isLoggedIn(res => {
              if (!res) {
                return LocStorage.create('redirect', $location.path(), () => $location.path('/login'))
              }
            })
          }
        }
      });
  });
