module.exports = function () {

  return {
    files: [
      {pattern: 'node_modules/es6-shim/es6-shim.js', instrument: false},
      {pattern: 'node_modules/systemjs/dist/system-polyfills.js', instrument: false},
      {pattern: 'node_modules/reflect-metadata/Reflect.js', instrument: false},
      {pattern: 'node_modules/systemjs/dist/system.js', instrument: false},
      {pattern: 'node_modules/rxjs/bundles/Rx.js', instrument: false},
      {pattern: 'node_modules/zone.js/dist/zone.js', instrument: false},
      {pattern: 'node_modules/zone.js/dist/async-test.js', instrument: false},
      {pattern: 'systemjs.config.js', instrument: false},

      {pattern: 'app/**/*.ts', load: false},
      {pattern: 'app/**/*.html', load: false},
      {pattern: 'app/**/*.spec.ts', ignore: true}
    ],

    tests: [{pattern: 'app/*.spec.ts', load: false}],

    middleware: function (app, express) {
      app.use('/node_modules', express.static(require('path').join(__dirname, 'node_modules')));
    },

    testFramework: 'jasmine',

    bootstrap: function (wallaby) {
      wallaby.delayStart();

      System.config({
        packages: {
          app: {
            defaultExtension: 'js',
            meta: {
              '*': {
                scriptLoad: true
              }
            }
          }
        }
      });

      var promises = [];

      Promise.all([System.import('@angular/core/testing'), System.import('@angular/platform-browser-dynamic/testing')])
        .then(function (results) {
          var testing = results[0];
          var browser = results[1];
          testing.setBaseTestProviders(
            browser.TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,
            browser.TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS
          );

          for (var i = 0, len = wallaby.tests.length; i < len; i++) {
            promises.push(System['import'](wallaby.tests[i].replace(/\.js$/, '')));
          }
        })
        .then(function () {
          return Promise.all(promises);
        })
        .then(function () {
          wallaby.start();
        })
        .catch(function (e) {
          setTimeout(function () {
            throw e;
          }, 0);
        });
    },
    debug: true
  };
};