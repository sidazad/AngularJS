module.exports = function(config)  {
    config.set(
        {
            basePath: '',
            frameworks: ['jasmine'],
            files: [
                '../js/libs/angular.js',
                '../js/libs/angular-route.js',
                '../js/libs/angular-local-storage.js',
                '../js/libs/angular-mocks.js',
                '../js/libs/angular-ui-bootstrap.min.js',
                '../js/*.js',
                '../test/*.js'
            ],
            reporters: ['progress'],
            port: 9876,
            colors: true,
            logLevel: config.LOG_INFO,
            autoWatch: true,
            browsers: ['Chrome'],
            captureTimeout: 60000,
            singleRun: false
        }
    );
};