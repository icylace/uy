// https://rollupjs.org/guide/en/#configuration-files

// TODO:
export default (_ctx) => ({
  external: ["hyperapp", "hyperapplicable"],
  // input: "./output/typescript/index.js",
  // output: [
  //   {
  //     file: "./dist/index.esm.js",
  //     format: "esm",
  //   },
  //   // ctx.environment === "prod" ? {
  //   //   file: "./dist/index.umd.js",
  //   //   format: "umd",
  //   //   name: "TODO:",
  //   // } : null,
  // ],
})
