'use strict';

(function() {

class AdminOfferController {
  constructor(currentUser, $state, offers, Offers, $scope, loans) {
    var vm = this;
    vm.$scope = $scope;
    vm.Offers = Offers;

    vm.offers = offers;
    vm.user = currentUser;

    vm.$scope.sortType = '-date';
  }

  updateOffer(offer, status) {
    var vm = this;
    offer.status = status;
    vm.Offers.updateOffer(offer);
  }

}

angular.module('investnextdoorCaApp.admin')
  .controller('AdminOfferController', AdminOfferController);

})();
