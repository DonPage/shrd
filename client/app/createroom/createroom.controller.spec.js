'use strict';

describe('Controller: CreateroomCtrl', function () {

  // load the controller's module
  beforeEach(module('shrdApp'));

  var CreateroomCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CreateroomCtrl = $controller('CreateroomCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
