module.exports = function(grunt) {

  'use strict';

  var path = require('path');

  var config = {

    pkg: grunt.file.readJSON('package.json'),
    env: process.env,
    
  };

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

  grunt.util._.extend(config, loadConfig('./node_modules/cf-grunt-config/tasks/options/'));

  grunt.initConfig(config);

  /**
   * The above tasks are loaded here.
   */
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-string-replace');
  grunt.loadNpmTasks('grunt-topdoc');

  /**
   * Create custom task aliases and combinations
   */
  grunt.registerTask('vendor', ['bower', 'copy:docs_assets', 'concat']);
  grunt.registerTask('default', ['concat', 'less', 'string-replace', 'autoprefixer', 'copy:docs', 'topdoc']);

};
