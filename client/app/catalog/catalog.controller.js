'use strict';

angular.module('meanshopApp')

  .controller('CatalogNewCtrl', function ($scope, $state, Menu, Catalog) {
    $scope.menus = Menu.query();
    $scope.catalogs = {};
    $scope.addsubcatagory =  function(){
        alert("ADD : "+$scope.catalogs.name);
        Catalog.save($scope.catalogs).$promise.then(function (catalog) {
            $state.go('products');      
        }).then(function (menu) {
      
      }).catch(errorHandler($scope));
    };
});