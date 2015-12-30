'use strict';

angular.module('shrd2App')
  .directive('cahcontroller', () => ({
    templateUrl: 'components/cah-controller/cah-controller.html',
    restrict: 'E',
    link: (scope, element, attr) => {
      element.addClass('TEST');
    },
    controller: 'cah-GameController',
    controllerAs: 'ctrl'
  }));
