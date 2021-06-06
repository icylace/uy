// https://vitejs.dev/config/#shared-options

const { resolve } = require("path")

export default {
  build: {
    lib: {
      entry: resolve(__dirname, "lib/main.ts"),
      name: "uy",
    },
    rollupOptions: {
      external: ["hyperapp"],
      output: {
        globals: {
          hyperapp: "Hyperapp"
        }
      }
    }
  }
}
