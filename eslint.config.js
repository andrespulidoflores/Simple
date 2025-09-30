// .eslintrc.js (CommonJS)
const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ["**/*.js"],
    languageOptions: { sourceType: "script" }, // CommonJS
  },
];
