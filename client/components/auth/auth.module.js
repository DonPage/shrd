'use strict';

angular.module('shrd2App.auth', [
  'shrd2App.constants',
  'shrd2App.util',
  'ngCookies',
  'ngRoute'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
