'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-assert');
var chai   = require('chai');
var sinon  = require('sinon');
var sinonChai = require('sinon-chai');
var expect = chai.expect;
chai.use(sinonChai);

describe('general', function () {
  describe('core functionality', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .inDir(path.join(__dirname, 'temp'))
        .on('end', done);
    });

    it('the generator can be required without throwing', function () {
      // not testing the actual run of generators yet
      require('../app');
    });

    it('creates expected files', function () {
      assert.file([
        'browserslist',
        'package.json',
        'gulp.config.js',
        'gulpfile.babel.js',
        '.gitignore',
        '.node-version'
      ]);
    });

    it('creates a package.json', function () {
      assert.file('package.json');
      // Name should be set to default for the associated prompt
      assert.fileContent('package.json', 'cloudfour-patternlib-project');
    });
  });
  describe('dependency management', function () {
    var npmStub;
    beforeEach(function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .inDir(path.join(__dirname, 'temp'))
        .on('ready', function (generator) {
          // When run in test, generator.npmInstall is a no-op
          // so we can't test its output. Instead, we'll
          // stub and make sure it is getting called correctly.
          npmStub = sinon.stub();
          generator.npmInstall = npmStub;
        })
        .on('end', done);
    });
    it('invokes npmInstall for dependencies', function () {
      var callArgs = npmStub.lastCall.args;
      var expectedPackages = [
        'babel-core',
        'babel-loader',
        'cloudfour/core-gulp-tasks',
        'cloudfour/core-hbs-helpers',
        'fabricator-assemble',
        'gulp',
        'gulp-util'
      ];
      expect(npmStub).to.have.been.calledOnce;
      expect(callArgs).to.have.length(2);
      expect(callArgs[0]).to.have.members(expectedPackages);
      expect(callArgs[1]).to.have.property('saveDev', true);
    });

  });
});
