"use strict"

// https://github.com/postcss/postcss#usage
// https://github.com/postcss/postcss-cli#context

module.exports = ctx => ({
  modules: true,
  plugins: [
    require("postcss-import"),
    require("postcss-preset-env")({
      stage: 2,
      features: { "nesting-rules": true },
    }),
    ctx.env === "prod" ? require("cssnano")({ preset: "default" }) : null,
    require("postcss-reporter")({ clearReportedMessages: true }),
  ],
})
