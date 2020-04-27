#!/usr/bin/env bash

build:dev() {
  clean

  echo "Compile TypeScript for development."
  tsc --build --incremental false
  rollup --config rollup.config.dev.js
  babel ./output/rollup --out-dir ./dist

  echo "Compile CSS for development."
  postcss ./src/index.css --output ./dist/index.css
}

build:dev:update() {
  echo "Update compiling TypeScript for development."
  tsc --build
  rollup --config rollup.config.dev.js
  babel ./output/rollup --out-dir ./dist
}

build:prod() {
  clean

  echo "Compile TypeScript for production."
  tsc --build --incremental false
  rollup --config rollup.config.prod.js
  babel ./output/rollup --out-dir ./dist

  echo "Compile CSS for production."
  postcss ./src/index.css --output ./dist/index.css --env prod

  echo "Minimize ES modules."
  terser --ecma 6 --compress --mangle --module --output ./dist/index.min.js -- ./output/rollup/index.js
  gzip --best --to-stdout ./dist/index.min.js > ./dist/index.min.js.gz

  echo "Minimize UMD."
  terser --ecma 6 --compress --mangle --output ./dist/index.umd.min.js -- ./output/rollup/index.umd.js
  gzip --best --to-stdout ./dist/index.umd.min.js > ./dist/index.umd.min.js.gz

  echo "Generate types."
  tsc --declaration --emitDeclarationOnly --incremental false --module amd --outFile ./output/typescript/index.js
  cp ./output/typescript/index.d.ts ./dist
}

clean() {
  echo "Reset the output folders of generated files."
  rm -fr ./dist && mkdir ./dist
  rm -fr ./output && mkdir ./output
}

lint() {
  echo "Lint."
  eslint ./src --ext .js,.jsx,.ts,.tsx
}

lint:fix() {
  echo "Lint and automatically fix as much as possible."
  eslint ./src --ext .js,.jsx,.ts,.tsx --fix
}

lint:fix-dry-run() {
  echo "Lint and do a dry-run of automatically fixing as much as possible."
  eslint ./src --ext .js,.jsx,.ts,.tsx --fix-dry-run
}

prepare() {
  echo "Prepare web modules."
  snowpack
}

typecheck() {
  echo "Type-check TypeScript code."
  tsc --noEmit --incremental false
}

watch:babel() {
  echo "Watch Babel."
  babel ./output/rollup --watch --out-dir ./dist
}

watch:postcss() {
  echo "Watch PostCSS."
  postcss ./src/index.css --output ./dist/index.css --watch
}

watch:rollup() {
  echo "Watch Rollup."
  rollup --config --watch
}

watch:typescript() {
  echo "Watch TypeScript."
  tsc --watch
}

# ------------------------------------------------------------------------------

if [ -z "$1" ] ; then
  echo "Task name required!"
  exit 1
fi

"$1"
