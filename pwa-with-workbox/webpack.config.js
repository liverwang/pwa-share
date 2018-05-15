const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const WorkBoxPlugin = require('workbox-webpack-plugin')

const PUBLIC_PATH = '/'
const BUILD_PATH = path.resolve(__dirname, 'dist');

module.exports = {
  devtool: 'cheap-module-source-map',
  devServer: {
    contentBase: BUILD_PATH
  },
  entry: {
    app: path.resolve(__dirname, 'src/index.js')
  },
  output: {
    path: BUILD_PATH,
    filename: 'static/js/[name].bundle.[hash:8].js'
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }, {
      test: /\.(png|svg|jpg|gif)$/,
      use: ['file-loader']
    }, {
      test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
      loader: require.resolve('url-loader'),
      options: {
        name: 'static/media/[name].[hash:8].[ext]',
      },
    },]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, 'src/index.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new WorkBoxPlugin.InjectManifest({
      swSrc: path.join(__dirname, 'src/service-worker.js'),
      swDest: path.join(BUILD_PATH, 'service-worker.js')
    })
  ]
}