'use strict';

angular.module('meanshopApp')
  .config(function ($stateProvider) {
      $stateProvider.state('newCatalog', {
        url: '/catalog/new',
        templateUrl: 'app/catalog/catalog.html',
        controller: 'CatalogNewCtrl',
        authenticate: 'admin'
      });

  });