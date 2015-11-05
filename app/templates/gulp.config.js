'use strict';

let helpers = require('core-hbs-helpers');
const SRC = './src';
const DEST = './dist';

let config = {
  assemble: {
    helpers: helpers
  },
  assets: {
    dest: `${DEST}/assets/toolkit/images`,
    optimize: false,
    src: `${SRC}/assets/toolkit/images/**/*`
  },
  clean: {
    dest: DEST
  },
  css: {
    dest: `${DEST}/assets`,
    optimize: false,
    src: `${SRC}/assets/{toolkit,fabricator}/styles/{toolkit,fabricator}.css`
  },
  js: {
    plugins: {
      webpack: {
        entry: {
          'toolkit/scripts/toolkit':
            `${SRC}/assets/toolkit/scripts/toolkit.js`,
          'fabricator/scripts/fabricator':
            `${SRC}/assets/fabricator/scripts/fabricator.js`
        },
        output: {
          path: `${DEST}/assets`,
          filename: '[name].js'
        },
        module: {
          loaders: [
            {
              test: /\.js$/,
              loaders: ['babel-loader']
            }
          ]
        }
      }
    }
  },
  serve: {
    plugins: {
      browserSync: {
        files: `${DEST}/**/*`,
        open: false,
        server: { baseDir: DEST }
      }
    }
  },
  watch: {
    watchers: [
      {
        match: [`${SRC}/assets/**/*.css`],
        tasks: ['css']
      },
      {
        match: [`${SRC}/{data,docs,materials,views}/**/*`],
        tasks: ['assemble']
      },
      {
        match: [`${SRC}/assets/**/*.js`],
        tasks: ['js']
      }
    ]
  }
};

export default config;
