module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    bowerRequirejs: {
      target: {
        rjsConfig: 'public/config.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-bower-requirejs');
}