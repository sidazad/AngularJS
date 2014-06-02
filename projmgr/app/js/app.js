var app = angular.module('projmgr', ['ngRoute', 'ui.bootstrap', 'LocalStorageModule']).config(
    function($routeProvider) {

        $routeProvider.when("/", {
            templateUrl: "partials/landing.html",
            controller: "LandingCtrl"
        }).when("/dashboard", {
            templateUrl: "partials/dashboard.html",
            controller: "DashboardCtrl"
        }).otherwise({redirectTo: '/'});;

});
