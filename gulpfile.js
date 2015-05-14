var gulp = require('gulp');
var jasmine = require('gulp-jasmine');

gulp.task('coverage', require('gulp-jsx-coverage').createTask({
    src: ['spec/**/*.js', 'spec/components/*.jsx'],  // will pass to gulp.src as mocha tests
    istanbul: {                                      // will pass to istanbul
        coverageVariable: '__MY_TEST_COVERAGE__',
        exclude: /node_modules|spec/                 // do not instrument these files
    },
    transpile: {                                     // this is default whitelist/blacklist for transpilers
        babel: {
            include: /\.jsx?$/,
            exclude: /node_modules/
        },
        coffee: {
            include: /\.coffee$/
        }
    },
    coverage: {
        reporters: ['text-summary', 'json', 'lcov'], // list of istanbul reporters
        directory: 'coverage'                        // will pass to istanbul reporters
    },
    jasmine: {                                         // will pass to mocha
//        reporter: 'spec'
    },
    babel: {                                         // will pass to babel
        sourceMap: 'inline'                          // get hints in HTML covarage reports
    },
    coffee: {                                        // will pass to coffee.compile
        sourceMap: true                              // true to get hints in HTML coverage reports
    },

    //optional
    cleanup: function () {
        // do extra tasks after test done
        // EX: clean global.window when test with jsdom
    }
}));

gulp.task('default', function () {
    return gulp.src('spec/ButtonSpec.js')
        .pipe(jasmine());
});