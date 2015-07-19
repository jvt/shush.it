'use strict';

var path = require('path');
var nconf = require('nconf');
var config = nconf.argv().env().file({ file: path.join(__dirname, 'config.json') });

/**
 * Grunt Module
 */
 module.exports = function(grunt) {
  /**
   * Configuration
   */
   grunt.initConfig({
    /**
     * Get package meta data
     */
     pkg: grunt.file.readJSON('package.json'),
    /**
     * Set project object
     */
     project: {
      app: 'app',
      assets: '<%= project.app %>/assets',
      src: '<%= project.assets %>/src',
      css: [
      '<%= project.src %>/scss/style.scss'
      ],
      js: [
      '<%= project.src %>/js/*.js'
      ]
    },
    /**
     * Sass
     */
     sass: {
      dev: {
        options: {
          style: 'expanded',
          compass: true
        },
        files: {
          'public/stylesheets/style.css': '<%= project.assets%>/src/scss/style.scss',
          'public/stylesheets/materialize.css': '<%= project.assets%>/src/scss/materialize.scss',
          'public/stylesheets/fontawesome.css': 'public/components/font-awesome/scss/font-awesome.scss'
        }
      },
      dist: {
        options: {
          style: 'compressed',
          compass: true
        },
        files: {
          'public/stylesheets/style.css': '<%= project.assets%>/src/scss/style.scss',
          'public/stylesheets/materialize.css': '<%= project.assets%>/src/scss/materialize.scss',
          'public/stylesheets/fontawesome.css': 'public/components/font-awesome/scss/font-awesome.scss'
        }
      }
    },
    /**
     * Knexmigrate
     */
     knexmigrate: {
      config: {
        directory: './migrations',
        tableName: 'knex_migrations',
        database: {
          client: 'mysql',
          connection: config.get('database')
        }
      }
    },
    /**
     * Minify Javascript files
     */
     minified : {
      files: {
        src: [
          '<%= project.assets%>/src/js/global.js',
        ],
        dest: 'public/javascripts/'
      },
      options : {
        sourcemap: false,
        allinone: false
      }
    },
    /**
     * Watch
     */
     watch: {
      sass: {
      files: '<%= project.src %>/scss/{,*/}*.{scss,sass}',
      tasks: ['sass:dev']
    }
  }
});

  /**
   * Load Grunt plugins
   */
   require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  /**
   * Default task
   * Run `grunt` on the command line
   */
   grunt.registerTask('default', [
    'sass:dev',
    'knexmigrate:latest',
    'minified',
    'watch'
    ]);

 };
