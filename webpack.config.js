const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// ref: https://www.expexp.jp/webpack4-2019/

var config = {
  entry: {
    app: path.resolve(__dirname, './src/', "main.js"),
    vendor: ['react', 'react-dom', 'flux', 'react-router-dom']
  },
  output: {
    path: path.resolve(__dirname, './dist/'),
    publicPath: '/',
    filename: '[name]-[hash].js'
  },
  // 最適化オプションを上書き
  optimization: {
    minimizer: [
      new TerserPlugin({}),
      new OptimizeCssAssetsPlugin({})
    ]
  },
  resolve: {
    modules: [
      `${__dirname}/src`,
      "node_modules"
    ],
    alias: {
      views: `${__dirname}/src/views`,
      components: `${__dirname}/src/components`,
      models: `${__dirname}/src/models`,
      lib: `${__dirname}/src/lib`,
      router: `${__dirname}/src/router`,
      store: `${__dirname}/src/store`
    }
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: [/node_modules/],
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.ttf$|\.eot$|\.svg$/,
        loader: 'file-loader?name=[name].[ext]?[hash]'
      },
      { test: /\.woff$/, loader: 'url-loader?mimetype=application/font-woff' },
      { test: /\.woff2$/, loader: 'url-loader?mimetype=application/font-woff' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html"
    }),
    new MiniCssExtractPlugin({
      filename: 'style-[chunkhash].css'
    }),
    new CleanWebpackPlugin()
  ]
};

module.exports = (env, argv) => {

  if (argv.mode === 'development') {
    config.devtool = 'source-map';
    config.devServer = {
      historyApiFallback: true,
      contentBase: path.join(__dirname, "public"),
      watchContentBase: true,
      open: true,
      port: 3000
    };
  }

  if (argv.mode === 'production') {
  }

  return config;
};