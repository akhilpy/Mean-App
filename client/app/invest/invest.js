'use strict';

angular.module('investnextdoorCaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('invest', {
        url: '/invest',
        templateUrl: 'app/invest/invest.html',
        controller: 'InvestController',
        controllerAs: 'vm',
        abstract: true
      })
      .state('invest.index', {
        url: '',
        templateUrl: 'app/invest/invest.index.html',
        ncyBreadcrumb: {
          label: 'Invest',
          parent: 'main'
        }
      })
      .state('invest.welcome', {
        url: '/welcome',
        templateUrl: 'app/invest/invest.welcome.html',
        ncyBreadcrumb: {
          label: 'Welcome',
          parent: 'invest.index'
        }
      });
  });
