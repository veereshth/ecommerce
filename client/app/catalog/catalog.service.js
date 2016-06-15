'use strict';

angular.module('meanshopApp')
  .factory('Catalog', function ($resource, $timeout,  $q) {
    var resource = $resource('/api/catalog/:id/:controller', null, {
      'update': { method: 'PUT'},
      'menu':{ method: 'GET', isArray: true,
        params: {
          controller: 'menu'
        }
      },
      'search': { method: 'GET', isArray: true,
        params: {
          controller: 'search'
        }
      }
    });
    
    return resource;
  });