// https://rollupjs.org/guide/en/#configuration-files

export default (_ctx) => ({
  external: ["eyepiece", "hyperapp", "hyperapplicable", "wtv"],
  input: "./output/typescript/index.js",
  output: [
    {
      file: "./dist/index.esm.js",
      format: "esm",
    },
    // ctx.environment === "prod" ? {
    //   file: "./dist/index.umd.js",
    //   format: "umd",
    //   name: "TODO:",
    // } : null,
  ],
})
