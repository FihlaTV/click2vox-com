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
    },
    uglify: {
      options: {
        preserveComments: function (node, comment) {
          if (/@(preserve|license|cc_on)/.test(comment.value))
            return true;
        }
      }
    },
    nightwatch: {
      options: {
        cwd: './'
      },

      'default' : {},

      browserstack: {
        argv: {
          env: 'browserstack'
        },
        settings: {
          silent: true
        }
      },

      'all' : {
        argv: {
          env: 'default,browserstack'
        }
      },
    },
    simplemocha: {
      all: {
        src: ['tests/**/*.js']
      }
    }
  });

  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-nightwatch');
  grunt.loadNpmTasks('grunt-simple-mocha');

  grunt.registerTask('default', ['concurrent:devel']);
}
