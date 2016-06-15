angular.module('meanshopApp')
  .factory('Menu', function ($resource, $timeout,  $q) {
    var resource =  $resource('/api/menus/:id/:controller', null, {
      'update': { method: 'PUT'},
      'catalog':{ method: 'GET', isArray: true,
        params: {
          controller: 'catalog'
        }
      },
      'search': { method: 'GET', isArray: true,
        params: {
          controller: 'search'
        }
      },
        'getAll': { method: 'GET', isArray: true,
        params: {
          controller: 'getall'
        }
      }
    });
        return resource;

});