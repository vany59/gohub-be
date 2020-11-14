const webpack = require("webpack");
const path = require("path");
const nodeExternals = require("webpack-node-externals");
const chalk = require("chalk");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");

module.exports = {
  entry: ["webpack/hot/poll?100", "./src/main.ts"],
  watch: true,
  target: "node",
  externals: [
    nodeExternals({
      allowlist: ["webpack/hot/poll?100"]
    })
  ],
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.proto$/,
        use: [
          {
            loader: "webpack-grpc-web-loader",
            options: {
              protoPath: path.resolve(__dirname, "./src/protos")
            }
          }
        ]
      }
    ]
  },
  mode: "development",
  resolve: {
    alias: {
      "@environment": path.resolve(__dirname, "./src/environment"),
      "@models": path.resolve(__dirname, "./src/models"),
      "@configs": path.resolve(__dirname, "src/configs"),
      "@gateway": path.resolve(__dirname, "src/gateway"),
      "@socketio": path.resolve(__dirname, "src/socketio"),
      "@guard": path.resolve(__dirname, "src/guard"),
      "@service": path.resolve(__dirname, "src/service"),
      "@decorator": path.resolve(__dirname, "src/decorator"),
      "@types": path.resolve(__dirname, "src/types"),
      "@res": path.resolve(__dirname, "src/res"),
      "@shared": path.resolve(__dirname, "src/shared"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@constant": path.resolve(__dirname, "src/constant")
    },
    extensions: [".tsx", ".ts", ".js"]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.WatchIgnorePlugin([/\.js$/, /\.d\.ts$/]),
    new ProgressBarPlugin({
      format:
        chalk.hex("#6c5ce7")("build ") +
        chalk.hex("#0984e3")("▯:bar▯ ") +
        // chalk.red('▯ :bar ▯ ') +
        chalk.hex("#00b894")("(:percent) ") +
        // chalk.green(':percent ') +
        chalk.hex("#ffeaa7")(":msg"),
      // chalk.blue('( :elapsed s )')
      complete: "▰",
      incomplete: "▱",
      clear: false
    }),
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false
    })
  ],
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false
  },
  output: {
    pathinfo: false
    // path: path.join(__dirname, 'dist'),
    // filename: 'server.js'
  }
};
