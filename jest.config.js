// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require("fs");

const config = JSON.parse(fs.readFileSync(`${__dirname}/.swcrc`, "utf-8"));
module.exports = {
  testEnvironment: "jsdom",
  roots: ["./src"],
  transform: {
    // 使用 swc 转译 JavaScript 和 TypeScrit
    "^.+\\.(t|j)sx?$": ["@swc/jest", { ...config }],
    // 静态资源 stub 转译
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
