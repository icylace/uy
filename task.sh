#!/usr/bin/env bash

task:index() {
  local tasks=(
    # '_snowpack'
    'build:dev'
    'build:prod'
    'clean'
    'hard-refresh'
    'lint'
    'lint:fix'
    'lint:fix-dry-run'
    'prepare'
    'release'
    'test'
    'typecheck'
    'watch'
    'watch:postcss'
    'watch:rollup'
    'watch:typescript'
  )

  echo "Available tasks:"

  for task in ${tasks[@]} ; do
    echo -e "\t$task"
  done
}

# ------------------------------------------------------------------------------

# task:_snowpack() {
#   if [ ! -d ./web_modules ] ; then
#     task:prepare
#   fi

#   echo
#   echo "Using web modules created by Snowpack..."

#   local modules=($(jq --raw-output '.imports | keys_unsorted | @sh' ./web_modules/import-map.json))

#   local changes=()
#   for module in "${modules[@]}" ; do
#     # Trim off the first and last characters which should be single quotes.
#     local m="${module:1:-1}"

#     # Escape slashes that would appear for scoped modules.
#     local e="${m//\//\\\/}"

#     changes+=("s/'$e';$/\"\/web_modules\/$e.js\"/g")
#   done

#   # https://superuser.com/a/462400/959677
#   local completeChange=$(IFS=$';' ; echo "${changes[*]}")

#   sed -i '' "$completeChange" ./dist/index.esm.js
# }

# ------------------------------------------------------------------------------

task:build:dev() {
  task:clean

  echo
  echo "Compiling TypeScript for development..."
  npx tsc --build

  # Exit if errors found.
  [ $? != 0 ] && return

  npx rollup --config
  # task:_snowpack

  echo
  echo "Copying compiled JavaScript to the distribution folder..."
  # https://stackoverflow.com/a/1313688/1935675
  rsync --archive ./output/typescript/ ./dist --exclude=tsconfig.tsbuildinfo

  echo
  echo "Compiling CSS for development..."
  npx postcss ./src/index.css --output ./dist/index.css
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
  # task:_snowpack

  echo
  echo "Copying compiled JavaScript to the distribution folder..."
  # https://stackoverflow.com/a/1313688
  rsync --archive ./output/typescript/ ./dist --exclude=tsconfig.tsbuildinfo

  echo
  echo "Compiling CSS for production..."
  npx postcss ./src/index.css --output ./dist/index.css --env prod

  echo
  echo "Minifying and gzipping ES modules..."
  npx terser --ecma 6 --compress --mangle --module --output ./dist/index.esm.min.js -- ./dist/index.esm.js
  gzip --best --to-stdout ./dist/index.esm.min.js > ./dist/index.esm.min.js.gz

  echo
  echo "Minifying and gzipping UMD modules..."
  npx terser --ecma 6 --compress --mangle --output ./dist/index.umd.min.js -- ./dist/index.umd.js
  gzip --best --to-stdout ./dist/index.umd.min.js > ./dist/index.umd.min.js.gz

  # TODO:
  # echo
  # echo "Generating types..."
  # npx tsc --declaration --emitDeclarationOnly --incremental false --module amd --outFile ./dist/index.js
}

# ------------------------------------------------------------------------------

task:clean() {
  echo
  echo "Cleaning the distribution folder..."
  rm -fr ./dist && mkdir ./dist
}

# ------------------------------------------------------------------------------

task:hard-refresh() {
  echo
  echo "Hard-refreshing dependencies..."

  rm ./package-lock.json && rm -fr ./node_modules && rm -fr ./output

  npm install --save hyperapp shades remeda redaxios
  npm install --save @fortawesome/fontawesome-free
  npm install --save ntml
  npm install --save-dev snowpack typescript rollup eslint terser prettier
  # npm install --save-dev deno_ls_plugin
  npm install --save-dev eslint-plugin-import eslint-plugin-json eslint-plugin-node eslint-plugin-promise
  npm install --save-dev eslint-config-prettier eslint-plugin-prettier
  npm install --save-dev eslint-config-standard eslint-plugin-standard
  npm install --save-dev eslint-import-resolver-typescript
  npm install --save-dev @typescript-eslint/eslint-plugin @typescript-eslint/parser utility-types
  npm install --save-dev jest ts-jest
  npm install --save-dev postcss cssnano
  npm install --save-dev postcss-cli postcss-import postcss-reporter postcss-preset-env

  task:prepare
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
  echo "Patching `shades` to pass typechecking..."
  # https://github.com/jamesmcnamara/shades/issues/37#issuecomment-594810688
  # https://stackoverflow.com/a/42192768/1935675
  sed -i '' '30i\
    _val: T\
    _key: K
  ' ./node_modules/shades/types/utils.ts

  # # https://www.snowpack.dev/#run-after-every-install
  # echo "Preparing web modules..."
  # npx snowpack
}

# ------------------------------------------------------------------------------

# https://github.com/sindresorhus/np#release-script
task:release() {
  echo
  echo "Releasing..."
  np --no-2fa
}

# ------------------------------------------------------------------------------

task:test() {
  # TODO:
  # echo "Error: no test specified" && exit 1
  return
}

# ------------------------------------------------------------------------------

task:typecheck() {
  echo
  echo "Typechecking TypeScript code..."
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
  task:index
  exit 1
fi

"task:$1"
