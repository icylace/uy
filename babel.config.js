"use strict"

// https://babeljs.io/docs/en/configuration#babelconfigjs
// https://babeljs.io/docs/en/config-files#project-wide-configuration
// https://www.snowpack.dev/#importing-packages-by-name

module.exports = {
  presets: [["@babel/preset-env", {
    targets: { esmodules: true },
    modules: false,
  }]],
  plugins: [["snowpack/assets/babel-plugin.js", {}]],
}
