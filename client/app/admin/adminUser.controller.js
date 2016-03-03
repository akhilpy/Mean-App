'use strict';

(function() {

class AdminUserController {
  constructor(currentUser, $state, Form, $http) {
    var vm = this;
    vm.$http = $http;
    vm.Form = Form;
    vm.user = currentUser;

    vm.investorProfile = vm.Form.getInvestorProfile();
    vm.borrowerProfile = vm.Form.getBorrowerProfile();
  }

  updateInvestor(form) {
    var vm = this;
    var address = {};
    var investor = {};

    vm.submitted = true;

    if (form.$valid) {
      vm.$http.put('/api/users/' + vm.user._id, {
        user: vm.user
      })
      .then(() => {
        //console.log('updated');
      })
      .catch(err => {
        vm.errors.other = err.message;
      });
    }
  }

  updateBorrower(form) {
    var vm = this;
    vm.submitted = true;

    if (form.$valid) {
      vm.$http.put('/api/users/' + vm.user._id, {
        user: vm.user
      })
      .then(() => {
        //console.log('updated');
      })
      .catch(err => {
        vm.errors.other = err.message;
      });
    }
  }

}

angular.module('investnextdoorCaApp.admin')
  .controller('AdminUserController', AdminUserController);

})();