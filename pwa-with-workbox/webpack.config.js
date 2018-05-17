const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const WorkBoxPlugin = require('workbox-webpack-plugin')
const SwRegisterWebpackPlugin = require('sw-register-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const PUBLIC_PATH = '/'
const BUILD_PATH = path.resolve(__dirname, 'dist')

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
    filename: 'static/js/[name].bundle.[hash:8].js',
    publicPath: PUBLIC_PATH
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]'
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, 'src/index.html')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new WorkBoxPlugin.InjectManifest({
      swSrc: path.resolve(__dirname, 'src/service-worker.js'),
      swDest: path.resolve(BUILD_PATH, 'service-worker.js')
    }),
    // 通过插件生成sw生成
    new SwRegisterWebpackPlugin({
      version: +new Date()
    }),
    new CopyWebpackPlugin([{
      from:path.resolve(__dirname,'src/icon.png'),
      to:path.resolve(__dirname,'dist')
    },{
      from:path.resolve(__dirname,'src/manifest.json'),
      to:path.resolve(__dirname,'dist')
    }])
  ],
  resolve: {
    alias: {
      Assets: path.resolve(__dirname, 'src/')
    }
  }
}
