#!/usr/bin/env bash

_build:dev:bundle() {
  rollup --config rollup.config.dev.js
  sed -i '' "s/from 'hyperapp'/from \"\/web_modules\/hyperapp.js\"/g;s/from 'shades'/from \"\/web_modules\/shades.js\"/g" ./output/rollup/index.js
  cp ./output/rollup/* ./dist
}

_build:prod:bundle() {
  rollup --config rollup.config.prod.js
  sed -i '' "s/from 'hyperapp'/from \"\/web_modules\/hyperapp.js\"/g;s/from 'shades'/from \"\/web_modules\/shades.js\"/g" ./output/rollup/index.js
  cp ./output/rollup/* ./dist
}

build:dev() {
  clean

  echo
  echo "Compiling TypeScript for development..."
  tsc --build --incremental false
  _build:dev:bundle

  echo
  echo "Compiling CSS for development..."
  postcss ./src/index.css --output ./dist/index.css
}

build:dev:update() {
  echo
  echo "Compiling TypeScript incrementally for development..."
  tsc --build
  _build:dev:bundle
}

build:prod() {
  clean

  echo
  echo "Compiling TypeScript for production..."
  tsc --build --incremental false
  _build:prod:bundle

  echo
  echo "Compiling CSS for production..."
  postcss ./src/index.css --output ./dist/index.css --env prod

  echo
  echo "Minifying and gzipping ES modules..."
  terser --ecma 6 --compress --mangle --module --output ./dist/index.min.js -- ./output/rollup/index.js
  gzip --best --to-stdout ./dist/index.min.js > ./dist/index.min.js.gz

  echo
  echo "Minifying and gzipping UMD modules..."
  terser --ecma 6 --compress --mangle --output ./dist/index.umd.min.js -- ./output/rollup/index.umd.js
  gzip --best --to-stdout ./dist/index.umd.min.js > ./dist/index.umd.min.js.gz

  echo
  echo "Generating types..."
  tsc --declaration --emitDeclarationOnly --incremental false --module amd --outFile ./output/typescript/index.js
  cp ./output/typescript/index.d.ts ./dist
}

clean() {
  echo
  echo "Resetting the output folders of generated files..."
  rm -fr ./dist && mkdir ./dist
  rm -fr ./output && mkdir ./output
}

lint() {
  echo
  echo "Linting..."
  eslint ./src --ext .js,.jsx,.ts,.tsx
}

lint:fix() {
  echo
  echo "Linting and automatically fixing as much as possible..."
  eslint ./src --ext .js,.jsx,.ts,.tsx --fix
}

lint:fix-dry-run() {
  echo
  echo "Linting and doing a dry-run of automatically fixing as much as possible..."
  eslint ./src --ext .js,.jsx,.ts,.tsx --fix-dry-run
}

prepare() {
  echo
  echo "Preparing web modules..."
  snowpack
}

typecheck() {
  echo
  echo "Type-checking TypeScript code..."
  tsc --noEmit --incremental false
}

watch:postcss() {
  echo
  echo "Watching PostCSS..."
  postcss ./src/index.css --output ./dist/index.css --watch
}

watch:rollup() {
  echo
  echo "Watching Rollup..."
  rollup --config --watch
}

watch:typescript() {
  echo
  echo "Watching TypeScript..."
  tsc --watch
}

# ------------------------------------------------------------------------------

if [ -z "$1" ] ; then
  echo "Task name required!"
  exit 1
fi

"$1"
