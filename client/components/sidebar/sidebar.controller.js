'use strict';

angular.module('meanshopApp')
  .controller('SidebarCtrl', function ($scope, $http, Catalog, Menu, $location) {
   var id = 1;
    $scope.categories=[];
     $http.get('/api/menus/'+id+'/getall',
                  { 
                   
                  })
     .success(function (data,status) {
            if(data){
           $scope.categories =data;
            console.log("response "+data[0].name);

            }else{
                $scope.catalog =[];
            }
     });
    $scope.catalog = Catalog.query();
    console.log("Catalog"+$scope.catalog);
    $scope.isActive = function(route) {
      return $location.path().indexOf(route) > -1;
    };
  });

angular.module('meanshopApp')
.directive('tree', function() {
  return {
    restrict: 'E', // tells Angular to apply this to only html tag that is <tree>
    replace: true, // tells Angular to replace <tree> by the whole template
    scope: {
      t: '=src' // create an isolated scope variable 't' and pass 'src' to it.  
    },    
    template: '<ul><branch ng-repeat="c in t" src="c"></branch></ul>'    
  };
})
angular.module('meanshopApp')
.directive('treesub', function() {
  return {
    restrict: 'E', // tells Angular to apply this to only html tag that is <tree>
    replace: true, // tells Angular to replace <tree> by the whole template
    scope: {
      t: '=src' // create an isolated scope variable 't' and pass 'src' to it.  
    },    
    template: '<ul><branchsub ng-repeat="c in t.catalogs" src="c"></branchsub></ul>'    
  };
})
angular.module('meanshopApp')
.directive('branch', function($compile) {
  return {
    restrict: 'E', // tells Angular to apply this to only html tag that is <branch>
    replace: true, // tells Angular to replace <branch> by the whole template
    scope: {
      b: '=src' // create an isolated scope variable 'b' and pass 'src' to it.  
    },    
    template: '<li>{{ b.name }}</li>',
    link: function(scope, element, attrs) {
      //// Check if there are any children, otherwise we'll have infinite execution
      
      var has_children = angular.isArray(scope.b.children);
      
      //// Manipulate HTML in DOM
      if (has_children) {        
        element.append('<treesub src="b"></treesub>');
        
        // recompile Angular because of manual appending
        $compile(element.contents())(scope); 
      }
      
      //// Bind events
      element.on('click', function(event) {
          event.stopPropagation();          
        
          if (has_children) {
            element.toggleClass('collapsed');
          }
      });      
    }
  };
});
angular.module('meanshopApp')
.directive('branchsub', function($compile) {
  return {
    restrict: 'E', // tells Angular to apply this to only html tag that is <branch>
    replace: true, // tells Angular to replace <branch> by the whole template
    scope: {
      b: '=src' // create an isolated scope variable 'b' and pass 'src' to it.  
    },    
    template: '<li><a ui-sref="productCatalog({slug: b.slug})">{{ b.name }}</a></li>',
    link: function(scope, element, attrs) {
      //// Check if there are any children, otherwise we'll have infinite execution
      
      var has_children = 0;
      
      //// Manipulate HTML in DOM
      if (has_children) {        
        element.append('<treesub src="b"></treesub>');
        
        // recompile Angular because of manual appending
        $compile(element.contents())(scope); 
      }
      
      //// Bind events
      element.on('click', function(event) {
          event.stopPropagation();          
        
          if (has_children) {
            element.toggleClass('collapsed');
          }
      });      
    }
  };
});

