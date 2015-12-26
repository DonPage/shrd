'use strict';

describe('Controller: ScreenCtrl', function () {

  // load the controller's module
  beforeEach(module('shrd2App'));

  var ScreenCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ScreenCtrl = $controller('ScreenCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
