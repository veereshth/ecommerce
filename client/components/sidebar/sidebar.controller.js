'use strict';

angular.module('meanshopApp')
  .controller('SidebarCtrl', function ($scope, Catalog, $location) {
    $scope.catalog = Catalog.query();
    console.log("Catalog"+$scope.catalog);
    $scope.isActive = function(route) {
      return $location.path().indexOf(route) > -1;
    };
  });
