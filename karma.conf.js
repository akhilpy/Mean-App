// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'client/bower_components/jquery/dist/jquery.js',
      'client/bower_components/angular/angular.js',
      'client/bower_components/angular-resource/angular-resource.js',
      'client/bower_components/angular-cookies/angular-cookies.js',
      'client/bower_components/angular-sanitize/angular-sanitize.js',
      'client/bower_components/lodash/dist/lodash.compat.js',
      'client/bower_components/angular-socket-io/socket.js',
      'client/bower_components/angular-ui-router/release/angular-ui-router.js',
      'client/bower_components/angular-validation-match/dist/angular-validation-match.min.js',
      'client/bower_components/chosen/chosen.jquery.js',
      'client/bower_components/rangy/rangy-core.js',
      'client/bower_components/rangy/rangy-classapplier.js',
      'client/bower_components/rangy/rangy-highlighter.js',
      'client/bower_components/rangy/rangy-selectionsaverestore.js',
      'client/bower_components/rangy/rangy-serializer.js',
      'client/bower_components/rangy/rangy-textrange.js',
      'client/bower_components/textAngular/dist/textAngular.js',
      'client/bower_components/textAngular/dist/textAngular-sanitize.js',
      'client/bower_components/textAngular/dist/textAngularSetup.js',
      'client/bower_components/api-check/dist/api-check.js',
      'client/bower_components/angular-formly/dist/formly.js',
      'client/bower_components/bootstrap/dist/js/bootstrap.js',
      'client/bower_components/angular-formly-templates-bootstrap/dist/angular-formly-templates-bootstrap.js',
      'client/bower_components/dropzone/dist/min/dropzone.min.js',
      'client/bower_components/ngMask/dist/ngMask.js',
      'client/bower_components/slick-carousel/slick/slick.min.js',
      'client/bower_components/angular-slick/dist/slick.js',
      'client/bower_components/angular-ui-router-default/angular-ui-router-default.js',
      'client/bower_components/angular-socialshare/dist/angular-socialshare.min.js',
      'client/bower_components/moment/moment.js',
      'client/bower_components/angular-moment/angular-moment.js',
      'client/bower_components/angular-animate/angular-animate.js',
      'client/bower_components/v-accordion/dist/v-accordion.js',
      'client/bower_components/angular-breadcrumb/release/angular-breadcrumb.js',
      'client/bower_components/ng-dialog/js/ngDialog.js',
      'client/bower_components/jquery-ui/jquery-ui.js',
      'client/bower_components/angular-ui-sortable/sortable.js',
      'client/bower_components/ng-csv/build/ng-csv.min.js',
      'client/bower_components/angular-mocks/angular-mocks.js',
      // endbower
      'node_modules/socket.io-client/socket.io.js',
      'client/app/app.js',
      'client/{app,components}/**/*.module.js',
      'client/{app,components}/**/*.js',
      'client/{app,components}/**/*.html'
    ],

    preprocessors: {
      '**/*.html': 'ng-html2js',
      'client/{app,components}/**/*.js': 'babel'
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: 'client/'
    },

    babelPreprocessor: {
      options: {
        sourceMap: 'inline',
        optional: [
          'es7.classProperties'
        ]
      },
      filename: function (file) {
        return file.originalPath.replace(/\.js$/, '.es5.js');
      },
      sourceFileName: function (file) {
        return file.originalPath;
      }
    },

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8080,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // reporter types:
    // - dots
    // - progress (default)
    // - spec (karma-spec-reporter)
    // - junit
    // - growl
    // - coverage
    reporters: ['spec'],

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
