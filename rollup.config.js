export default ctx => ({
  input: "./output/typescript/index.js",
  output: [
    {
      file: "./dist/index.esm.js",
      format: "esm",
    },
    ctx.env === "prod" ? {
      file: "./dist/index.umd.js",
      format: "umd",
      name: "TODO:",
    } : null,
  ],
})
