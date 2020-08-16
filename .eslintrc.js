"use strict"

// https://eslint.org/docs/rules/

// https://github.com/sanctuary-js/sanctuary-style
// https://github.com/Gipphe/eslint-config-haskellish
// https://medium.com/@uistephen/style-guides-for-linting-ecmascript-2015-eslint-common-google-airbnb-6c25fd3dff0
// https://levelup.gitconnected.com/setting-up-eslint-with-prettier-typescript-and-visual-studio-code-d113bbec9857

module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "standard",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier"],
  parserOptions: {
    ecmaVersion: 2018,
    project: "./tsconfig.json",
    sourceType: "module",
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": ["", ".tsx"],
    },
    "import/resolver": {
      typescript: {},
    },
  },
  rules: {
    "array-bracket-newline": ["error", "consistent"],
    // "array-bracket-spacing": [ "error", "always" ],
    "arrow-parens": ["error", "always"],
    "comma-dangle": [
      "error",
      {
        arrays: "always-multiline",
        objects: "always-multiline",
        imports: "always-multiline",
        exports: "always-multiline",
        functions: "always-multiline",
      },
    ],
    // , "comma-style": [ "error", "first" ]
    "func-call-spacing": ["error", "always", { allowNewlines: true }],
    "import/no-absolute-path": ["error", { esmodule: false }],
    indent: [
      "error",
      2,
      {
        // ArrayExpression: "first",
        // CallExpression: { arguments: "first" },
        // FunctionDeclaration: { parameters: "first" },
        // FunctionExpression: { parameters: "first" },
        ignoredNodes: ["CallExpression"],
        //  ignoredNodes: ["CallExpression",
        //                 "CallExpression > *",
        //                 "CallExpression > ArrowFunctionExpression ArrowFunctionExpression > *",
        //                 "CallExpression > FunctionExpression > BlockStatement",
        //                 "ConditionalExpression",
        //                 "MemberExpression"],
        // ImportDeclaration: "first",
        // ObjectExpression: "first",
        SwitchCase: 1,
      },
    ],
    // "object-curly-newline": [ "error",
    //                           { ObjectExpression: "never",
    //                             ObjectPattern: "never",
    //                             ImportDeclaration: "never",
    //                             ExportDeclaration: "never" } ],
    "no-extra-parens": [
      "error",
      "all",
      {
        enforceForArrowConditionals: false,
        nestedBinaryExpressions: false,
      },
    ],
    "no-unexpected-multiline": ["off"],
    "no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    quotes: ["error", "double"],

    "import/no-extraneous-dependencies": ["error", { devDependencies: ["**/test.tsx", "**/test"] }],

    "@typescript-eslint/ban-types": ["warn"],
    "@typescript-eslint/no-explicit-any": ["warn", { ignoreRestArgs: false }],
    "@typescript-eslint/no-unsafe-assignment": ["warn"],
    "@typescript-eslint/no-unsafe-call": ["warn"],
    "@typescript-eslint/no-unsafe-member-access": ["warn"],
    "@typescript-eslint/no-unsafe-return": ["warn"],
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    // "@typescript-eslint/indent": [2, 2],
  },
}
