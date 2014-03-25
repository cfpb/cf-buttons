module.exports = function(grunt) {

  'use strict';

  var path = require('path');


  /**
   * Initialize a variable to represent the Grunt task configuration.
   */
  var config = {

    // Define a couple of utility variables that may be used in task options.
    pkg: grunt.file.readJSON('package.json'),
    env: process.env,

    // Define tasks specific to this project here

  };


  /**
   * Define a function that, given the path argument, returns an object
   * containing all JS files in that directory.
   */
  function loadConfig(path) {
    var glob = require('glob');
    var object = {};
    var key;

    glob.sync('*', {cwd: path}).forEach(function(option) {
      key = option.replace(/\.js$/,'');
      object[key] = require(path + option);
      grunt.verbose.writeln("External config item - " + key + ": " + object[key]);
    });

    return object;
  }


  /**
   * Combine the config variable defined above with the results of calling the
   * loadConfig function with the given path, which is where our external
   * task options get installed by npm.
   */
  grunt.util._.extend(config, loadConfig('./node_modules/cf-grunt-config/tasks/options/'));

  grunt.initConfig(config);


  /**
   * Load the tasks we want to use, which are specified as dependencies in
   * the package.json file of cf-grunt-config.
   */

  // Sets the CWD to the cf-grunt-config package so that the loadNpmTasks method
  // (employed in load-grunt-tasks) looks in the correct place.
  grunt.file.setBase('./node_modules/cf-grunt-config/');
  // Loads all Grunt tasks in the node_modules directory within the new CWD.
  require('load-grunt-tasks')(grunt);
  // Sets the CWD back to the project root so that the tasks work as expected.
  grunt.file.setBase('../../');
  // Load any project-specific tasks installed in the customary location.
  require('load-grunt-tasks')(grunt);


  /**
   * Create custom task aliases for our component build workflow.
   */
  grunt.registerTask('vendor', ['bower', 'copy:docs_assets', 'concat']);
  grunt.registerTask('default', ['concat', 'less', 'string-replace', 'autoprefixer', 'copy:docs', 'topdoc']);

};
