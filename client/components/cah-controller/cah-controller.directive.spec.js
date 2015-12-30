'use strict';

describe('Directive: cahController', function () {

  // load the directive's module and view
  beforeEach(module('shrd2App'));
  beforeEach(module('components/cah-controller/cah-controller.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<cah-controller></cah-controller>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the cahController directive');
  }));
});
