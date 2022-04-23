#!/usr/bin/env bash

update_json() {
  local filter="$1"
  local file="$2"
  local tmp="$(mktemp)"

  if [ ! -f "$file" ] ; then
    echo '{}' > "$file"
  fi

  jq "$filter" "$file" > "$tmp" && mv -f "$tmp" "$file"
}

# ------------------------------------------------------------------------------

task:index() {
  local tasks=(
    'build'
    'check'
    'clean'
    'dev'
    'lint'
    'preview'
    'reinstall'
    'release'
    'reset'
    'test'
  )

  echo "Available tasks:"

  for task in ${tasks[@]} ; do
    echo -e "\t$task"
  done
}

# ------------------------------------------------------------------------------

task:build() {
  npx vite build
}

# ------------------------------------------------------------------------------

task:build:dev() {
  task:clean

  echo
  echo "Compiling TypeScript for development..."
  npx tsc --build

  # Exit if errors found.
  [ $? != 0 ] && return

  npx rollup --config

  echo
  echo "Copying compiled JavaScript to the distribution folder..."
  # https://stackoverflow.com/a/1313688/1935675
  rsync --archive ./output/typescript/ ./dist --exclude=tsconfig.tsbuildinfo
}

# ------------------------------------------------------------------------------

task:build:prod() {
  task:clean

  echo
  echo "Compiling TypeScript for production..."
  npx tsc --build --incremental false

  # Exit if errors found.
  [ $? != 0 ] && return

  npx rollup --config --environment prod

  echo
  echo "Copying compiled JavaScript to the distribution folder..."
  # https://stackoverflow.com/a/1313688
  rsync --archive ./output/typescript/ ./dist --exclude=tsconfig.tsbuildinfo

  echo
  echo "Minifying and gzipping ES modules..."
  npx terser --ecma 6 --compress --mangle --module --output ./dist/index.esm.min.js -- ./dist/index.esm.js
  gzip --best --to-stdout ./dist/index.esm.min.js > ./dist/index.esm.min.js.gz

  # echo
  # echo "Minifying and gzipping UMD modules..."
  # npx terser --ecma 6 --compress --mangle --output ./dist/index.umd.min.js -- ./dist/index.umd.js
  # gzip --best --to-stdout ./dist/index.umd.min.js > ./dist/index.umd.min.js.gz
}

# ------------------------------------------------------------------------------

task:check() {
  echo
  echo "Typechecking TypeScript code..."
  npx tsc --noEmit --incremental false
}

# ------------------------------------------------------------------------------

task:clean() {
  echo
  echo "Cleaning the distribution folder..."
  rm -fr ./dist
}

# ------------------------------------------------------------------------------

task:clean:all() {
  task:clean
  echo
  echo "Cleaning the intermiediary output folder..."
  rm -fr ./output
}

# ------------------------------------------------------------------------------

task:dev() {
  npx vite
}

# ------------------------------------------------------------------------------

task:lint() {
  echo
  echo "Linting..."
  npx eslint ./src --ext .js,.jsx,.ts,.tsx
}

# ------------------------------------------------------------------------------

task:preview() {
  npx vite preview
}

# ------------------------------------------------------------------------------

task:reinstall() {
  echo
  echo "Reinstalling dependencies..."

  rm ./package-lock.json
  rm -fr ./node_modules
  rm -fr ./output

  update_json '.dependencies = {} | .devDependencies = {}' ./package.json

  local dev_modules=()

  # Language
  dev_modules+=('typescript')
  dev_modules+=('terser')

  # CSS
  dev_modules+=('postcss')
  dev_modules+=('cssnano')
  dev_modules+=('postcss-cli')
  dev_modules+=('postcss-import')
  dev_modules+=('postcss-reporter')
  dev_modules+=('postcss-preset-env')

  # Linting
  dev_modules+=('eslint')
  dev_modules+=('@typescript-eslint/parser')
  dev_modules+=('@typescript-eslint/eslint-plugin')
  # dev_modules+=('eslint-plugin-import')
  # dev_modules+=('eslint-plugin-json')
  # dev_modules+=('eslint-plugin-node')
  # dev_modules+=('eslint-plugin-promise')
  # dev_modules+=('eslint-config-prettier')
  # dev_modules+=('eslint-plugin-prettier')
  # dev_modules+=('eslint-config-standard')
  # dev_modules+=('eslint-plugin-standard')
  # dev_modules+=('eslint-import-resolver-typescript')

  # Formatting
  # dev_modules+=('prettier')

  # Testing
  dev_modules+=('jest')
  dev_modules+=('@types/jest')
  dev_modules+=('ts-jest')
  dev_modules+=('fast-check')

  # Building
  dev_modules+=('rollup')
  dev_modules+=('vite')

  npm install --save-dev "${dev_modules[@]}"

  local modules=()

  modules+=('hyperapp')
  modules+=('hyperapplicable')
  modules+=('eyepiece')
  modules+=('wtv')
  # modules+=('@fortawesome/fontawesome-free')
  # modules+=('axios')
  # modules+=('remeda')
  modules+=('@ungap/structured-clone')

  npm install --save "${modules[@]}"
}

# ------------------------------------------------------------------------------

# https://github.com/sindresorhus/np#release-script
task:release() {
  task:build:prod

  echo
  echo "Releasing..."
  np --no-2fa
}

# ------------------------------------------------------------------------------

task:reset() {
  task:reinstall
  task:clean
}

# ------------------------------------------------------------------------------

# TODO:

task:test() {
  return
  # npx jest
}

# ------------------------------------------------------------------------------

if [ -z "$1" ] ; then
  task:index
  exit 1
fi

"task:$1"
