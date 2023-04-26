/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production"; // 或者 env.production
  return {
    mode: isProduction ? "production" : "development",
    devtool: isProduction ? false : "inline-source-map",
    entry: "./src/index.tsx",
    output: {
      filename: "main.js",
      path: path.resolve(__dirname, "dist"),
    },
    devServer: {
      static: {
        directory: path.join(__dirname, "public"),
      },
      compress: true,
      port: 9000,
      hot: true,
      open: true
    },
    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          use: {
            loader: "swc-loader",
            options: {
              sync: true,
            },
          },
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: path.join(__dirname, "public/index.html"),
      }),
    ],
  };
};
