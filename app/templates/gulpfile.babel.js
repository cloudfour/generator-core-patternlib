'use strict';

import assemble from 'fabricator-assemble';
import config from './gulp.config.js';
import gulp from 'gulp';

let tasks = require('core-gulp-tasks');
let utils = require('gulp-util');
let env = utils.env;

/* Register core tasks */
[
  'clean',
  'css',
  'js',
  'serve',
  'watch'
].forEach(task => {
  tasks[task](gulp, config[task]);
});

/* Register Assembly task */
gulp.task('assemble', () => assemble(config.assemble));

/* Register composite tasks */
gulp.task('frontend', [
  'assemble',
  'css',
  'js'
]);

/* Register default task */
gulp.task('default', ['frontend'], (done) => {
  gulp.start('serve');
  if (env.dev) {
    gulp.start('watch');
  }
  done();
});
