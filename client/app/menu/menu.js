'use strict';
angular.module('meanshopApp')
  .config(function ($stateProvider) {
      $stateProvider.state('newMenu', {
        url: '/menu/new',
        templateUrl: 'app/menu/menu.html',
        controller: 'MenuNewCtrl',
        authenticate: 'admin'
      });

  });
