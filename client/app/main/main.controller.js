'use strict';

angular.module('meanshopApp')
  .controller('MainCtrl', function($scope, $http, Product) {
    $scope.products = Product.query();
  });
