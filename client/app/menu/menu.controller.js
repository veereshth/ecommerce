'use strict';

angular.module('meanshopApp')

  .controller('MenuNewCtrl', function ($scope, $state, Menu) {
        $scope.cmenu = {}; // create a new instance
          $scope.menus = Menu.query();
        console.log("Menu Length : "+$scope.menus.length);
        $scope.addmanu = function(){
        $scope.cmenu.info = "New menu added";    
      Menu.save($scope.cmenu).$promise.then(function (menu) {
                    $scope.menus = Menu.query();
                    
      }).then(function (menu) {
      
      }).catch(errorHandler($scope));
    };
    $scope.deleteItem=function($id){
         Menu.delete({id: $id}, function success(/* value, responseHeaders */) {
 $scope.menus = Menu.query();      
         }, errorHandler($scope));
    };
    
        $scope.updateItem=function(list){
        return Menu.update({id: list._id},list).$promise.then(function (menu) {
      }).then(function (menu) {
                           $scope.menus = Menu.query();

      }).catch(errorHandler($scope));
        }
    errorHandler = function ($scope){
  return function error(httpResponse){
    console.log('failed: ', httpResponse);
    $scope.errors = httpResponse;
  };
};

});
