// import resolve from "@rollup/plugin-node-resolve"
// import typescript from "@rollup/plugin-typescript"

export default {
  input: "./transpiled/src/index.js",
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
  // plugins: [
  // typescript(),
  // resolve(),
  // ]
}
