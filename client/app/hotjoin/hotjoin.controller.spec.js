'use strict';

describe('Controller: HotjoinCtrl', function () {

  // load the controller's module
  beforeEach(module('shrd2App'));

  var HotjoinCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HotjoinCtrl = $controller('HotjoinCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
