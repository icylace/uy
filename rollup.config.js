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
      name: "TODO:",
    },
  ],
  // plugins: [resolve()]
}
