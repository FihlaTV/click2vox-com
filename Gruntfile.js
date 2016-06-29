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
          "public/stylesheets/root.css": "public/stylesheets/root.less",
          "public/stylesheets/vxb-button.css": "public/stylesheets/less/vxb-button.less",
          "public/stylesheets/vxb-widget.css": "public/stylesheets/less/vxb-widget.less"
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
      options: {
        nodeArgs: ['--debug'],
      },
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
    },
    concat: {
      options: {
        banner: '/*!\n' +
          ' * @license Voxbone v2.0.0-a\n' +
          ' * Copyright <%= grunt.template.today("yyyy") %> Voxbone. All Rights Reserved.\n' +
          ' * Licensed under the Apache License, Version 2.0 (the "License")\n' +
          ' */'
      },

      voxbone: {
        src: [
          'public/voxbone/vendor/jssip-voxbone-0.7.9.js',
          'public/voxbone/vendor/socket.io-1.4.5.js',
          'public/voxbone/vendor/sha-1.5.0.js',
          'public/voxbone/vendor/callstats.min.js',
          'public/voxbone/voxbone.js'
        ],
        dest: 'public/voxbone/dist/voxbone-2.0.0-a.js'
      }
    },
    uglify: {
      options: {
        preserveComments: function (node, comment) {
          if (/@(preserve|license|cc_on)/.test(comment.value))
            return true;
        }
      },
      voxbone: {
        src: '<%= concat.voxbone.dest %>',
        dest: 'public/voxbone/dist/voxbone-2.0.0-a.min.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('dist-js', ['concat:voxbone', 'uglify:voxbone']);
  grunt.registerTask('default', ['concurrent:devel']);
}
