app.directive("projectspane", [function() {

    return {

        restrict: 'A',
        templateUrl: 'partials/projectspane.html',
        scope: {
            projects: '=',
            addFn: '&',
            deleteFn: '&',
            selFn: '&'
        },
        link: function(scope, element, attrs) {
            scope.model = {};
            scope.deleted = new Array(scope.projects.length);
            for(var i=0; i<scope.projects.length; i++) {
                scope.deleted[i] = "";
            }

            scope.$watch('deleted', function(val) {
               console.log(scope.deleted);
            }, true);

            scope.addproject = function() {
                console.log("addproject");
                console.log(scope.model);
                scope.addFn({name: scope.model.projname, des: scope.model.projdes});
                scope.model.projname = "";
                scope.model.projdes = "";
            };

            scope.deleteprojects = function() {
                console.log("deleteprojects");
                scope.deleteFn({projects: scope.deleted});
            };

            scope.projselected = function(project) {
                console.log("projselected");
                console.log(project);
                scope.selFn({project: project});
            }
        }

    };

}]);



app.directive("projectsdetail", [function() {

    return {

        restrict: 'A',
        templateUrl: 'partials/projectsdetail.html',
        scope: {
            project: '=',
            weather: '='
        }
    };
}]);