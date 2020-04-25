"use strict"

// https://github.com/postcss/postcss#usage

module.exports = {
  modules: true,
  plugins: [
    require("postcss-import"),
    require("postcss-preset-env")({
      stage: 2,
      features: { "nesting-rules": true },
    }),
    require("postcss-reporter")({ clearReportedMessages: true }),
  ],
}
