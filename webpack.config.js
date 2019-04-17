var webpack = require("webpack")
var UglifyJSPlugin = require("uglifyjs-webpack-plugin")
var path = require("path")

module.exports = {
  // devtool: "source-map",
  entry: "./src/index.js",
  output: {
    filename: "refresh.min.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist/",
    libraryTarget: 'umd',
    library: 'COSRefresh'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, "src")],
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.js$/,
        enforce: "post",
        loader: "es3ify-loader"
      }
    ]
  },
  plugins: [
    new UglifyJSPlugin({
      sourceMap: false,
      uglifyOptions:{
        output: {
          comments: false,
          beautify: false
        }
      }
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    })
  ]
}
