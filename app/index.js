'use strict';

var generators = require('yeoman-generator');
var yosay = require('yosay');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
    this.features = {};
  },

  prompting: function () {
    var done = this.async();
    var prompts = [
      {
        name: 'name',
        message: 'Project name for package.json',
        type: 'input',
        default: 'cloudfour-patternlib-project'
      }
    ];
    function handleAnswers (answers) {
      this.features.name = answers.name;
      done();
    }
    this.prompt(prompts, handleAnswers.bind(this));
  },

  writing: {
    config: function () {
      var files = {
        'browserslist': 'browserslist',
        'gitignore': '.gitignore',
        'node-version': '.node-version'
      };
      Object.keys(files).forEach(function (key) {
        this.fs.copy(
          this.templatePath(key),
          this.destinationPath(files[key])
        );
      }, this);
    },

    gulp: function () {
      var files = [
        'gulpfile.babel.js',
        'gulp.config.js'
      ];
      files.forEach(function (file) {
        this.fs.copyTpl(
          this.templatePath(file),
          this.destinationPath(file),
          this.features
        );
      }, this);
    },

    fabricator: function () {
      var folders = [
        'assets',
        'data',
        'docs',
        'materials',
        'views'
      ];
      folders.forEach(function (folder) {
        this.fs.copy(
          this.sourceRoot() + '/src/' + folder + '/**',
          this.destinationRoot() + '/src/' + folder + '/'
        );
      }, this);
    },

    packageJSON: function () {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        this.features
      );
    },

    src: function () {
      this.fs.copy(
        this.sourceRoot() + '/src/*',
        this.destinationRoot() + '/src/'
      );
    }
  },

  install: function () {
    var packages = [
      'babel-core',
      'babel-loader',
      'cloudfour/core-gulp-tasks',
      'cloudfour/core-hbs-helpers',
      'fabricator-assemble',
      'gulp',
      'gulp-util'
    ];
    this.npmInstall(packages, { 'saveDev': true });
  },

  end: {
    confirmation: function () {
      this.log(yosay('The pattern library setup has been completed.'));
    }
  }
});
