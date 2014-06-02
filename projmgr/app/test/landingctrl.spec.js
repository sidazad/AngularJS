'use strict';

describe('Controller: LandingCtrl Test', function() {
   beforeEach(module('projmgr'));

    var landingCtrl, scope;

    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope;
        landingCtrl = $controller("LandingCtrl", {$scope: scope});
    }));

    it('contains empty username and password', function() {
        var username = scope.model.username, pwd = scope.model.password;
        expect(username).toBe("");
        expect(pwd).toBe("");
    });
});