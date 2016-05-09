module.exports = function (grunt) {
  require('jit-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          "public/stylesheets/root.css": "public/stylesheets/root.less"
        }
      }
    },
    watch: {
      styles: {
        files: ['public/stylesheets/**/*.less'],
        tasks: ['less'],
        options: {
          nospawn: true
        }
      }
    },
    nodemon: {
      dev: {
        script: './bin/www'
      }
    },
    concurrent: {
      devel: {
        tasks: ['nodemon', 'watch'],
        options: {
            logConcurrentOutput: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');

  grunt.registerTask('default', ['concurrent:devel']);
}