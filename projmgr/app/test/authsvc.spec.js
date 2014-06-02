'use strict';

describe('Service: AuthSvc Test', function() {
   beforeEach(module('projmgr'));

    var authsvc;

    beforeEach(inject(function(AuthService) {
        authsvc = AuthService;
    }));

    it('isLoggedIn should return false if no user is logged in', function() {
        var loggedin = authsvc.isLoggedIn();
        expect(loggedin).toBe(false);
    });
});