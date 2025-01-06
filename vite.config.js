// https://vitejs.dev/config/#shared-options

import { defineConfig } from "vite"

const { resolve } = require("path")

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "./src/lib/uwye.ts"),
      name: "uwye",
    },
    rollupOptions: {
      external: [
        "hyperapp",
        "hyperapplicable",
        "eyepiece",
        "wtv",
        "@ungap/structured-clone",
      ],
      output: {
        globals: {
          hyperapp: "Hyperapp",
          hyperapplicable: "Hyperapplicable",
          eyepiece: "Eyepiece",
          wtv: "wtv",
          "@ungap/structured-clone": "structuredClone",
        },
      },
    },
  },
})
