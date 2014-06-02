/**
 * Factory to assist in logging in.
 * CAUTION: Never use something like this for a real app as this is storing text based passwords in localstorage.
 * For a production app the passwords would be encrypted and stored in a database on the server.
 * */

 app.factory("AuthService", ["localStorageService", function(localStorageService) {

    return {

        login: function(username, password) {
            console.log("AuthService.login");
            console.log(username+"-"+password);

            // use an umbrella object to store all data related to our app
            var appdata = localStorageService.get('angularapp');
            console.log(appdata);
            if (appdata === null) {
                console.log("Creating new appdata");
                appdata = {'users': [], currentuser: '', loggedin: false};
                localStorageService.set("angularapp", appdata);
            }
            var users = appdata.users;
            var user = null;
            for (var i = 0; i < users.length; i++) {
                if (users[i].username === username) {
                    console.log("User " + username + " already exists");
                    user = users[i];
                }
            }
            if(user===null) {
                console.log("creating new user");
                var user = {username: username, password: password, data: {projects: []}};
                users.push(user);
                appdata.loggedin = true;
                appdata.currentuser = user.username;
                localStorageService.set('angularapp', appdata);
                return 0;
            }
            else {
                // validate user
                if (user.password !== password) {
                    console.log("Login failed - invalid password");
                    return -1;
                }
                else {
                    console.log("Login succeeded");
                    appdata.loggedin = true;
                    appdata.currentuser = username;
                    localStorageService.set('angularapp', appdata);
                    return 0;
                }
            }
            return 0;
        },

        logout: function () {
            console.log("AuthService.logout");
            var appdata = localStorageService.get('angularapp');
            if (appdata === undefined || appdata === null) {
                console.log("No users is currently logged in");
                return -1;
            }
            appdata.loggedin = false;
            appdata.currentuser = '';
            localStorageService.set('angularapp', appdata);
            return 0;
        },

        /**
         * @returns null if no currentuser is logged in, currentuser object if a user is logged in.
         * */
        getCurrentUser: function () {
            var appdata = localStorageService.get('angularapp');
            if (appdata !== undefined && appdata !== null) {
                if (appdata.loggedin === true) {
                    return appdata.currentuser;
                }
                return null;
            }
            return null;
        },

        getUserIdx: function(user) {
            var appdata = localStorageService.get('angularapp');
            for (var i = 0; i < appdata.users.length; i++) {
                if (appdata.users[i].username === user) {
                    return i;
                }
            }
            return -1;
        },

        isLoggedIn: function() {
            var appdata = localStorageService.get('angularapp');
            if(appdata===null || appdata===undefined) {
                return false;
            }
            return appdata.loggedin;
        }

    };

}]);



app.factory("ProjectSvc", ["localStorageService", "AuthService", function (localStorageService, authsvc) {

    return {

        addProject: function(user, projname, projdes) {
            var useridx = authsvc.getUserIdx(user);
            if(useridx === -1) {
                console.log("No user with username "+user);
                return null;
            }
            var appdata = localStorageService.get('angularapp');
            var projects = appdata.users[useridx].data.projects;
            var projidx = this.getProjIdx(projects, projname);
            if(projidx !== -1) {
                console.log("Project already exists");
                return null;
            }
            appdata.users[useridx].data.projects.push({name: projname, des: projdes});
            localStorageService.set('angularapp', appdata);
            return appdata.users[useridx].data.projects;
        },

        delProject: function(user, projname) {

        },

        getProjIdx: function(projects, projname) {
            for (var j = 0; j < projects.length; j++) {
                if (projects[j].name === projname) {
                    return j;
                }
            }
            return -1;
        },

        getProjectsForUser: function(user) {
            var appdata = localStorageService.get('angularapp');
            for(var i=0; i<appdata.users.length; i++) {
                if(appdata.users[i].username === user) {
                    return appdata.users[i].data.projects;
                }
            }
            return null;
        },


        deleteProjects: function(user, projects) {
            console.log("projsvc.deleteProjects");
            var appdata = localStorageService.get('angularapp');
            var useridx = authsvc.getUserIdx(user);
            for(var i=0; i<projects.length; i++) {
                var tmpproj = projects[i];
                var projidx = this.getProjIdx(appdata.users[useridx].data.projects, tmpproj);
                if(projidx !== -1) {
                    appdata.users[useridx].data.projects.splice(projidx, 1);
                }
            }
            localStorageService.set('angularapp', appdata);
            return appdata.users[useridx].data.projects;

        }

    }

}]);

app.factory("WeatherSvc", ["$http", function ($http) {

    return {

        getWeather: function(place) {
            url = "http://api.openweathermap.org/data/2.5/weather"
            return $http.get(url, {
                params: {q: place}
            }).then(function(result) {
               if(result!==null) {
                  return result.data.weather[0].description;
               }
                return "Weather not found";
            });

        }

    };

}]);










