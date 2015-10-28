# Installation

From within your working copy of this repository:

- `npm install -g yo`
- `npm install`
- `npm link`

# Usage

Node `0.12` or higher is required. If you're on a system running multiple versions including `0.12`, you can use a `.node-version` file in your project directory to force the version in use:

```sh
# In your project folder
echo "0.12" > .node-version
```

0. Create a new project directory; `cd` into it.
0. `yo cloudfour-core-patternlib`.
0. When the generation is completed, verify by running `gulp --tasks` to print out a tree of available tasks.
0. `gulp` to build and view locally. The `--dev` flag can be used to disable CSS and JS compression, and to enable file watching to rerun tasks automatically.
