const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== "production";
const webpack = require("webpack");
module.exports = {
  entry: "./src/app.jsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist/",
    filename: "js/app.js"
  },
  module: {
    rules: [
      // Dealing with React syntax
      {
        test: /\.m?jsx$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env", "react"]
          }
        }
      },
      // Dealing with CSS syntax
      {
        test: /\.css$/,
        use: [
          //   "sytle-loader",
          //   "css-loader",
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: "../"
            }
          },
          "css-loader"
        ]
      },
      // Dealing with SASS syntax
      {
        test: /\.scss$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader"
        ]
      },
      // Dealing with pics
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              name: "resource/[name].[ext]"
            }
          }
        ]
      },

      // Dealing with fonts
      {
        test: /\.(eot|svg|ttf|woff|woff2|otf)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,

              name: "resource/[name].[ext]"
            }
          }
        ]
      }
    ]
  },

  plugins: [
    // Dealing with Html files
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    // Dealing with CSS files
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? "css/[name].css" : "css/[name].[s].css",
      chunkFilename: devMode ? "css/[name].css" : "css/[name].[s].css"
    }),
    // Bring up public modules
    new webpack.optimize.SplitChunksPlugin({
      chunks: "all",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        },
        commons: {
          name: "common",
          filename: "js/base.js"
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        }
      }
    })
  ],

  devServer: {
    contentBase: "./dist",
    port: 8086
  }
};
