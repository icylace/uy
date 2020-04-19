// import resolve from "@rollup/plugin-node-resolve"

export default {
  input: "./transpiled/index.js",
  output: [
    {
      file: "./dist/index.js",
      format: "esm",
    },
    {
      file: "./dist/index.umd.js",
      format: "umd",
      name: "uy",
    },
  ],

  // TODO:
  // - try to improve `web_modules` usage

  // paths: {
  //   "/web_modules/hyperapp": "/web_modules/hyperapp",
  // },
  // plugins: [resolve ()],
}
