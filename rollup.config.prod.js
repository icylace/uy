export default {
  input: "./output/typescript/index.js",
  output: [
    {
      file: "./output/rollup/index.js",
      format: "esm",
    },
    {
      file: "./output/rollup/index.umd.js",
      format: "umd",
      name: "TODO:",
    },
  ],
}
