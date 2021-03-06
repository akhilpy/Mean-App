'use strict';

(function() {

class MainController {
  constructor(Auth, $scope) {
    this.Auth = Auth;
    this.isAdmin = Auth.isAdmin;

    this.image = 0;

    $scope.hero = {
      title: 'It’s borrowing reinvented. It’s investing on your terms.',
      subtitle: 'Canadian businesses and investors working together.<br>Everybody wins.'
    };
    $scope.editMode = false;
    $scope.toggleEditMode = function() {
      $scope.editMode = $scope.editMode === false ? true: false;
    };
  }
}

angular.module('investnextdoorCaApp')
  .controller('MainController', MainController);

})();
