'use strict';

angular.module('shrd2App')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/hotjoin', {
        templateUrl: 'app/hotjoin/hotjoin.html',
        controller: 'HotJoinController',
        controllerAs: 'hj'
      });
  });
