'use strict';

describe('Component: CatalogComponent', function () {

  // load the controller's module
  beforeEach(module('catalog'));

  var CatalogComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    CatalogComponent = $componentController('CatalogComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
