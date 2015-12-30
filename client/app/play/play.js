'use strict';

angular.module('shrd2App')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/play/:roomId', {
        templateUrl: 'app/play/play.html',
        controller: 'PlayController',
        controllerAs: 'player',
        resolve: {
          loginRoom(Auth, LocStorage, $location, $http) {
            Auth.isLoggedIn(res => {
              if (!res) {
                return LocStorage.create('redirect', $location.path(), () => $location.path('/login'))
              } else {
                console.log($location.path().split('/')[2]);
                //$http.get(`/api/rooms/${$location.path().split('/')[2]}/newPlayer`);
                Auth.joinRoom($location.path().split('/')[2],(res) => console.log('callback'))

              }
            })
          }
        }
      });
  });
