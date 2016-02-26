'use strict';

describe('Directive: widgetCurrentOffers', function () {

  // load the directive's module and view
  beforeEach(module('investnextdoorCaApp'));
  beforeEach(module('components/widgetCurrentOffers/widgetCurrentOffers.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<widget-current-offers></widget-current-offers>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the widgetCurrentOffers directive');
  }));
});
