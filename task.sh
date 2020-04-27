#!/usr/bin/env bash

build:dev() {
  clean
  tsc --build --incremental false
  rollup --config rollup.config.dev.js
  babel ./output/rollup --out-dir ./dist
  postcss ./src/index.css --output ./dist/index.css
}

build:dev:update() {
  tsc --build
  rollup --config rollup.config.dev.js
  babel ./output/rollup --out-dir ./dist
}

build:prod() {
  clean
  tsc --build --incremental false
  rollup --config rollup.config.prod.js
  babel ./output/rollup --out-dir ./dist
  postcss ./src/index.css --output ./dist/index.css --env prod

  # Minimize ES modules.
  terser --ecma 6 --compress --mangle --module --output ./dist/index.min.js -- ./output/rollup/index.js
  gzip --best --to-stdout ./dist/index.min.js > ./dist/index.min.js.gz

  # Minimize UMD.
  terser --ecma 6 --compress --mangle --output ./dist/index.umd.min.js -- ./output/rollup/index.umd.js
  gzip --best --to-stdout ./dist/index.umd.min.js > ./dist/index.umd.min.js.gz

  # Generate types.
  tsc --declaration --emitDeclarationOnly --incremental false --module amd --outFile ./output/typescript/index.js
  cp ./output/typescript/index.d.ts ./dist
}

clean() {
  # Reset the output folders of generated files.
  rm -fr ./dist && mkdir ./dist
  rm -fr ./output && mkdir ./output
}

lint() {
  eslint ./src --ext .js,.jsx,.ts,.tsx
}

lint:fix() {
  eslint ./src --ext .js,.jsx,.ts,.tsx --fix
}

lint:fix-dry-run() {
  eslint ./src --ext .js,.jsx,.ts,.tsx --fix-dry-run
}

prepare() {
  snowpack
}

typecheck() {
  tsc --noEmit --incremental false
}

watch:babel() {
  babel ./output/rollup --watch --out-dir ./dist
}

watch:postcss() {
  postcss ./src/index.css --output ./dist/index.css --watch
}

watch:rollup() {
  rollup --config --watch
}

watch:typescript() {
  tsc --watch
}

# ------------------------------------------------------------------------------

if [ -z "$1" ] ; then
  echo "Task name required!"
  exit 1
fi

"$1"
