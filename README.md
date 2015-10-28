## Installation

0. Clone this repository; `cd` into it.
0. Make sure you're running Node `0.12` or higher. If you have multiple versions installed, you can create a `.node-version` file in your working directory to force the version in use:

  ```sh
  echo "0.12" > .node-version
  ```
0. Run `npm install -g yo` if you don't already have `yo`.
0. Run `npm install`.
0. Run `npm link` to symlink this as a global Node package.

## Usage

0. Create a new project directory; `cd` into it.
0. Create a `.node-version` file here too if necessary.
0. Run `yo cloudfour-core-patternlib` and follow the prompts.
0. Run `npm build` to build and view locally.
0. Run `npm start` to build, view locally, and enable file watching for automatic rebuilds.
0. Run `gulp --tasks` to print out a tree of available tasks.
