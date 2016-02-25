'use strict';

(function() {

class ListingController {
  constructor($rootScope, $state, $scope, Form, Auth, ListingService, currentUser, currentListing) {
    var vm = this;
    vm.$state = $state;
    vm.ListingService = ListingService;
    vm.Form = Form;
    vm.errors = {};
    vm.submitted = false;

    vm.user = currentUser;
    vm.listingID = currentUser.borrower.listings[0];
    vm.currentListing = currentListing.data;
    vm.currentPage = $state.current.name;
    vm.currentState = vm.currentPage.substr(vm.currentPage.lastIndexOf('.') + 1);

    vm.pageData = vm.ListingService.pageData;

    vm.listingFields = {
      general: vm.Form.getListingPage('general'),
      details: vm.Form.getListingPage('details'),
      financial: vm.Form.getListingPage('financial'),
      social: vm.Form.getListingPage('social'),
      terms: vm.Form.getListingPage('terms')
    };

    $scope.$on('saveForm', function(event, mass) {
      var form = mass[0];
      var currentPage = mass[1];
      vm.saveListing(form, currentPage);
    });

  }

  saveListing(form, currentPage) {
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

    if (form.$valid && !vm.listingID) {
      // if no existing listing, create one
      vm.ListingService.createOne(savedListing);
    } else {
      // if there is an existing listing, update it
      vm.ListingService.saveOne(savedListing, vm.listingID);
    }
  }

  submitListing(form) {
    var vm = this;
    vm.submitted = true;

    if (form.$valid) {
      vm.Auth.changePassword(vm.user.oldPassword, vm.user.newPassword)
        .then(() => {
          vm.message = 'Password successfully changed.';
        })
        .catch(() => {
          form.password.$setValidity('mongoose', false);
          vm.errors.other = 'Incorrect password';
          vm.message = '';
        });
    }
  }
}

angular.module('investnextdoorCaApp')
  .controller('ListingController', ListingController);

})();
