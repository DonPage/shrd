'use strict';

angular.module('shrdApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/hotjoin', {
        templateUrl: 'app/hotjoin/hotjoin.html',
        controller: 'HotjoinCtrl'
      });
  });
