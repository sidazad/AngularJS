Setup for testing:
==================

- Install nodejs
- npm install -g karma
- write karma conf file
- install jasmine: npm install -g karma-jasmine
- Got an error: Can not load "Chrome", it is not registered!
    - To Fix: sudo npm install -g karma-chrome-launcher
- Run: /usr/local/lib/node_modules/karma/bin/karma start conf/karma.conf.js
  - Browser should pop up
- download angular-mocks.js from https://code.angularjs.org/1.2.16/angular-mocks.js (add to libs/js)