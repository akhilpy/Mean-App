'use strict';

(function() {

class AdminListingController {
  constructor(currentListing, ListingService, $stateParams, $state, Form, $scope) {
    var vm = this;
    vm.$state = $state;
    vm.$scope = $scope;
    vm.ListingService = ListingService;
    vm.Form = Form;

    vm.currentListing = currentListing.data;
    vm.listingID = vm.currentListing._id;

    if(Object.keys(currentListing).length !== 0) {
      vm.status = vm.currentListing.status;
    } else {
      vm.status = 'in-progress';
    }

    vm.currentPage = $state.current.name;
    vm.currentState = vm.currentPage.substr(vm.currentPage.lastIndexOf('.') + 1);

    vm.pageData = vm.ListingService.pageData;

    vm.options = {
      formState: {
        disabled: false
      }
    };

    vm.listingFields = {
      general: vm.Form.getListingPage('general'),
      details: vm.Form.getListingPage('details'),
      financial: vm.Form.getListingPage('financial'),
      social: vm.Form.getListingPage('social'),
      terms: vm.Form.getListingPage('terms')
    };

    vm.$scope.$on('saveForm', function() {
      var form = vm.$scope.listing;
      vm.saveListing(form);
    });
  }

  saveListing(form) {
    var vm = this;
    var savedListing = {};

    if( vm.currentListing.general ) {
      savedListing.general = vm.pageData(vm.currentListing, 'general');
    }

    if( vm.currentListing.details ) {
      savedListing.details = vm.pageData(vm.currentListing, 'details');
    }

    if( vm.currentListing.financial ) {
      savedListing.financial = vm.pageData(vm.currentListing, 'financial');
    }

    if( vm.currentListing.social ) {
      savedListing.social = vm.pageData(vm.currentListing, 'social');
    }

    if( vm.currentListing.terms ) {
      savedListing.terms = vm.pageData(vm.currentListing, 'terms');
    }

    vm.submitted = true;
    vm.ListingService.saveOne(savedListing, vm.listingID);
  }

  submitListing(form) {
    var vm = this;
    vm.submitted = true;
    vm.saveListing(form);

    if (form.$valid) {
      vm.ListingService.submitOne(vm.listingID);
      vm.$state.go('dashboard.index');
    }
  }
}

angular.module('investnextdoorCaApp.admin')
  .controller('AdminListingController', AdminListingController);

})();
