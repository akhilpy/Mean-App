'use strict';

describe('Controller: LegalController', function () {

  // load the controller's module
  beforeEach(module('investnextdoorCaApp'));

  var LegalController, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LegalController = $controller('LegalController', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
