
app.controller("LandingCtrl", ["$scope", "$location", "AuthService", function($scope, $location, authsvc) {
    console.log("LandingCtrl called");

    $scope.model = {};
    $scope.model.username = "";
    $scope.model.password = "";

    $scope.login = function() {
      console.log("LandingCtrl.login");

        console.log($scope.model);

        var ret = authsvc.login($scope.model.username, $scope.model.password);
        if (ret === 0) {
            console.log("successful login");
            $location.path("/dashboard");
        }
        else {
            console.log("Login unsuccessful");
        }

    };


}]);



app.controller("DashboardCtrl", ["$scope", "$location", "AuthService", "ProjectSvc", "WeatherSvc",
    function($scope, $location, authsvc, projsvc, weathersvc) {
    console.log("DashboardCtrl called");

    $scope.model = {};

    $scope.model.currentuser = authsvc.getCurrentUser();
    $scope.model.projects = projsvc.getProjectsForUser($scope.model.currentuser);
    $scope.model.selproject = null;
    $scope.weather = "Unknown";


    $scope.logout = function() {
        authsvc.logout();
        $location.path("/");
    }

    $scope.addproject = function(name, des) {
        console.log("DashboardCtrl.addproject:name="+name+",des="+des);
        console.log($scope.model.currentuser);
        var newprojlist = projsvc.addProject($scope.model.currentuser, name, des);
        if(newprojlist !==null) {
            $scope.model.projects = newprojlist;
        }
    };

    $scope.deleteprojects = function(projects) {
        console.log("DashboardCtrl.deleteprojects");
        console.log(projects);
        var newprojlist = projsvc.deleteProjects($scope.model.currentuser, projects);
        $scope.model.projects = newprojlist;
    };

    $scope.selproject = function(project) {
        console.log("DashboardCtrl.selproject");
        console.log(project);
        $scope.model.selproject = project;
        weathersvc.getWeather("Syracuse,NY").then(function(result) {
           $scope.weather = result;
        });
    }


}]);