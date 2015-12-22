'use strict';

describe('Controller: CreateRoomCtrl', function () {

  // load the controller's module
  beforeEach(module('shrd2App'));

  var CreateRoomCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CreateRoomCtrl = $controller('CreateRoomCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
