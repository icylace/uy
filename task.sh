#!/usr/bin/env bash

task:_snowpack() {
  echo
  echo "Use web modules created by Snowpack."

  local modules=($(jq --raw-output '.imports | keys_unsorted | @sh' ./web_modules/import-map.json))

  local changes=()
  for module in "${modules[@]}" ; do
    # Trim off the first and last characters which should be single quotes.
    local m="${module:1:-1}"

    changes+=("s/'$m';$/\"\/web_modules\/$m.js\"/g")
  done

  # https://superuser.com/a/462400/959677
  local completeChange=$(IFS=$';' ; echo "${changes[*]}")

  sed -i '' "$completeChange" ./output/rollup/index.js
}

# ------------------------------------------------------------------------------

task:_build:dev:bundle() {
  npx rollup --config rollup.config.dev.js
  task:_snowpack
  cp ./output/rollup/* ./dist
}

# ------------------------------------------------------------------------------

task:_build:prod:bundle() {
  npx rollup --config rollup.config.prod.js
  task:_snowpack
  cp ./output/rollup/* ./dist
}

# ------------------------------------------------------------------------------

task:build:dev() {
  task:clean

  echo
  echo "Compiling TypeScript for development..."
  npx tsc --build --incremental false
  task:_build:dev:bundle

  echo
  echo "Compiling CSS for development..."
  npx postcss ./src/index.css --output ./dist/index.css
}

# ------------------------------------------------------------------------------

task:build:dev:update() {
  echo
  echo "Compiling TypeScript incrementally for development..."
  npx tsc --build
  task:_build:dev:bundle
}

# ------------------------------------------------------------------------------

task:build:prod() {
  task:clean

  echo
  echo "Compiling TypeScript for production..."
  npx tsc --build --incremental false
  task:_build:prod:bundle

  echo
  echo "Compiling CSS for production..."
  npx postcss ./src/index.css --output ./dist/index.css --env prod

  echo
  echo "Minifying and gzipping ES modules..."
  npx terser --ecma 6 --compress --mangle --module --output ./dist/index.min.js -- ./output/rollup/index.js
  gzip --best --to-stdout ./dist/index.min.js > ./dist/index.min.js.gz

  echo
  echo "Minifying and gzipping UMD modules..."
  npx terser --ecma 6 --compress --mangle --output ./dist/index.umd.min.js -- ./output/rollup/index.umd.js
  gzip --best --to-stdout ./dist/index.umd.min.js > ./dist/index.umd.min.js.gz

  echo
  echo "Generating types..."
  npx tsc --declaration --emitDeclarationOnly --incremental false --module amd --outFile ./output/typescript/index.js
  cp ./output/typescript/index.d.ts ./dist
}

# ------------------------------------------------------------------------------

task:clean() {
  echo
  echo "Resetting the output folders of generated files..."
  rm -fr ./dist && mkdir ./dist
  rm -fr ./output && mkdir ./output
}

# ------------------------------------------------------------------------------

task:lint() {
  echo
  echo "Linting..."
  npx eslint ./src --ext .js,.jsx,.ts,.tsx
}

# ------------------------------------------------------------------------------

task:lint:fix() {
  echo
  echo "Linting and automatically fixing as much as possible..."
  npx eslint ./src --ext .js,.jsx,.ts,.tsx --fix
}

# ------------------------------------------------------------------------------

task:lint:fix-dry-run() {
  echo
  echo "Linting and doing a dry-run of automatically fixing as much as possible..."
  npx eslint ./src --ext .js,.jsx,.ts,.tsx --fix-dry-run
}

# ------------------------------------------------------------------------------

task:prepare() {
  echo
  echo "Preparing web modules..."
  npx snowpack
}

# ------------------------------------------------------------------------------

task:typecheck() {
  echo
  echo "Type-checking TypeScript code..."
  npx tsc --noEmit --incremental false
}

# ------------------------------------------------------------------------------

task:watch() {
  # TODO:
  # Use watchexec...
  return
}

# ------------------------------------------------------------------------------

task:watch:postcss() {
  echo
  echo "Watching PostCSS..."
  npx postcss ./src/index.css --output ./dist/index.css --watch
}

# ------------------------------------------------------------------------------

task:watch:rollup() {
  echo
  echo "Watching Rollup..."
  npx rollup --config --watch
}

# ------------------------------------------------------------------------------

task:watch:typescript() {
  echo
  echo "Watching TypeScript..."
  npx tsc --watch
}

# ------------------------------------------------------------------------------

if [ -z "$1" ] ; then
  echo "Task name required!"
  exit 1
fi

"task:$1"
