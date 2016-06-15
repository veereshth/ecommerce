'use strict';

var errorHandler, uploadHander;

angular.module('meanshopApp')

  .controller('ProductsCtrl', function ($scope, $http, Product, Menu) {
    $scope.products = Product.query();
    $scope.catalog = [];
    var pid = 1;
    $scope.categories = Menu.query();
    /* $http.get('/api/menus/'+id+'/getall',
                  { 
                   
                  })
     .success(function (data,status) {
            if(data){
           $scope.categories =data;
            console.log("response "+data[0].name);

            }else{
                $scope.catalog =[];
            }
     });*/

  $scope.otherProbs = [3, 3, 4];
    $scope.$on('search:term', function (event, data) {
      if(data.length) {
        $scope.products = Product.search({id: data});
        $scope.query = data;
      } else {
        $scope.products = Product.query();
        $scope.query = '';
      }
    });
    
    $scope.categorySelect = function(category){
                $http.get('/api/catalogs/'+category._id+'/menu',
                  { 
                   
                  })
     .success(function (data,status) {
            if(data){
            $scope.catalog = data;
            console.log("response "+data[0].name);

            }else{
                $scope.catalog =[];
            }
    });
    }
  })

  .controller('ProductCatalogCtrl', function ($scope, $stateParams, $http, Product, Menu) {
        $scope.categories = Menu.query();
    $scope.catalog = [];

    $scope.products = Product.catalog({id: $stateParams.slug});
    $scope.query = $stateParams.slug;
       
    $scope.categorySelect = function(category){
                $http.get('/api/catalogs/'+category._id+'/menu',
                  { 
                   
                  })
     .success(function (data,status) {
            if(data){
            $scope.catalog = data;
            console.log("response "+data[0].name);

            }else{
                $scope.catalog =[];
            }
    });
    }
  })

  .controller('ProductViewCtrl', function ($scope, $state, $stateParams, $http, Product, Auth, Menu) {
        var pid=1;
    $scope.product = {};//Product.get({id: $stateParams.id});
        $scope.categories = Menu.getAll({id: pid});

    $scope.imagesCon = [];
    $http.get("/api/products/"+$stateParams.id+"/",{
    }).success(function (data,status) {
            $scope.product = data;

        for (var i = 0; i< data.images.length;i++){
            console.log("http://localhost:9000"+data.images[i]);
            $scope.imagesCon.push("http://localhost:9000"+data.images[i]);
        }

    });
    $scope.user = Auth.getCurrentUser();
         $scope.zoomLvl = 4;
    console.log("Proct Length : "+  $scope.product.title);
    //var image =  $scope.product.images[1];
      $scope.myInterval = 5000;

  $scope.checkLenght = function($item){
      return($item<=$scope.images.length ? 1:0);
  }


    // initial image index
    $scope._Index = 0;

    // if a current image is the same as requested image
    $scope.isActive = function (index) {
        return $scope._Index === index;
    };

    // show prev image
    $scope.showPrev = function () {
        $scope._Index = ($scope._Index > 0) ? --$scope._Index : $scope.photos.length - 1;
    };

    // show next image
    $scope.showNext = function () {
        $scope._Index = ($scope._Index < $scope.photos.length - 1) ? ++$scope._Index : 0;
    };

    // show a certain image
    $scope.showPhoto = function (index) {
        $scope._Index = index;
    };
    $scope.deleteProduct = function(){
      Product.delete({id: $scope.product._id}, function success(/* value, responseHeaders */) {
        $state.go('products');
      }, errorHandler($scope));
    };
  })

  .controller('ProductNewCtrl', function ($scope, $state, $http, Product, Menu, Catalog) {
    $scope.product = {}; // create a new instance
    $scope.products = [];
    $scope.catalog = [];
   // $scope.catalog = Catalog.query();
    	var scope_ = $scope;
	$scope.product.pcolors = [];
    $scope.product.psizes = [];
    $scope.pcolors = [];
    $scope.psizes = [];
	$scope.removeRange = function(index) {
		scope_.pcolors.splice(index, 1);
	};
	$scope.addRange = function() {
		scope_.pcolors.push({});
	};
	$scope.removeSize = function(index) {
		scope_.psizes.splice(index, 1);
	};
	$scope.addSize = function() {
		scope_.psizes.push({});
	};
    $scope.menus = Menu.query();
    $scope.addProduct = function(){
       /*$scope.product.categories.push($scope.catags.categories);*/
        //$scope.product.categories = $scope.category1;
                console.log("Sub category" + $scope.psizes.length);
        for(var i=0; i < $scope.psizes.length;i++){
            $scope.product.psizes.push($scope.psizes[i].psize);
        }
        for(var j=0; j < $scope.pcolors.length;i++){
            $scope.product.pcolors.push($scope.pcolors[j].pcolor);
        }
      return Product.save($scope.product).$promise.then(function (product) {
                console.log("Upload Image : "+$scope.products.length);

        return Product.upload($scope.products, product._id);
      }).then(function (product) {
        $state.go('viewProduct', {id: product._id});
      }).catch(errorHandler($scope));
    };
    $scope.changedValue = function($id){
       /* $scope.catalog = Catalog.menu({id: $id._id}, function success(){
        $state.go('products');
      }, errorHandler($scope));
        */
        $http.get('/api/catalogs/'+$id._id+'/menu',
                  { 
                   
                  })
     .success(function (data,status) {
            if(data){
            $scope.catalog = data;
            console.log("response "+data[0].name);

            }else{
                $scope.catalog =[];
            }
     });
    };
    $scope.changedSubCategory = function(subCategory){
         $scope.product.categories = subCategory._id;
    }
 $scope.getFileDetails = function (e) {

            $scope.files = [];
            $scope.$apply(function () {

                // STORE THE FILE OBJECT IN AN ARRAY.
                for (var i = 0; i < e.files.length; i++) {
                    $scope.products.push(e.files[i])
                    console.log($scope.products[i].name);
                }

            });
        };
        $scope.deleteFile = function(idx) {
    
           $scope.products.splice(idx, 1);
     
        }

  })

  .controller('ProductEditCtrl', function ($scope, $state, $stateParams, Product, Upload, $timeout) {
    $scope.product = Product.get({id: $stateParams.id});
    $scope.editProduct = function(){
      return Product.update({id: $scope.product._id}, $scope.product).$promise.then(function (product) {
        return Product.upload($scope.product.picture, product._id);
      }).then(function (product) {
        $state.go('viewProduct', {id: product._id});
      }).catch(errorHandler($scope));
    };

    $scope.upload = uploadHander($scope, Upload, $timeout);
  })

  .constant('clientTokenPath', '/api/braintree/client_token')

  .controller('ProductCheckoutCtrl',
    function($scope, $http, $state, ngCart){
    $scope.errors = '';

    $scope.paymentOptions = {
      onPaymentMethodReceived: function(payload) {
        angular.merge(payload, ngCart.toObject());
        payload.total = payload.totalCost;
        $http.post('/api/orders', payload)
        .then(function success () {
          ngCart.empty(true);
          $state.go('products');
        }, function error (res) {
          $scope.errors = res;
        });
      }
    };
     $scope.getFileDetails = function (e) {

            $scope.files = [];
            $scope.$apply(function () {

                // STORE THE FILE OBJECT IN AN ARRAY.
                for (var i = 0; i < e.files.length; i++) {
                    $scope.products.push(e.files[i])
                    console.log($scope.products[i].name);
                }

            });
        };
    $scope.deleteFile = function(idx) {
    
           $scope.products.splice(idx, 1);
     
}
  });


errorHandler = function ($scope){
  return function error(httpResponse){
    console.log('failed: ', httpResponse);
    $scope.errors = httpResponse;
  };
};

uploadHander = function ($scope, Upload, $timeout) {
  return function(file) {
    if (file && !file.$error) {
      $scope.file = file;
      file.upload = Upload.upload({
        url: '/api/products/'+$scope.product._id+'/upload',
        file: file
      });

      file.upload.then(function (response) {
        $timeout(function () {
          file.result = response.data;
        });
      }, function (response) {
        if (response.status > 0){
          console.log(response.status + ': ' + response.data);
          errorHandler($scope)(response.status + ': ' + response.data);
        }
      });

      file.upload.progress(function (evt) {
        file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
      });
    }
  };
};
