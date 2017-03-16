'use strict';

describe('Controller: ChanneleditCtrl', function () {

  // load the controller's module
  beforeEach(module('okTalkApp'));

  var ChanneleditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ChanneleditCtrl = $controller('ChanneleditCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ChanneleditCtrl.awesomeThings.length).toBe(3);
  });
});
