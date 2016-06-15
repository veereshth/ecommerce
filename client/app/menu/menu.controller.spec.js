'use strict';

describe('Component: MenuComponent', function () {

  // load the controller's module
  beforeEach(module('menu'));

  var MenuComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    MenuComponent = $componentController('MenuComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
