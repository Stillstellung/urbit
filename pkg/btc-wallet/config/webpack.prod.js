const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const urbitrc = require('./urbitrc');

module.exports = {
  node: { fs: 'empty' },
  mode: 'production',
  entry: {
     app: './src/index.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              '@babel/transform-runtime',
              '@babel/plugin-proposal-object-rest-spread',
              '@babel/plugin-proposal-optional-chaining',
              '@babel/plugin-proposal-class-properties'
            ]
          }
        },
        exclude: /node_modules/
      },
      {
         test: /\.css$/i,
        use: [
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Landscape',
      template: './public/index.html'
    })

  ],
  output: {
    filename: (pathData) => {
      return pathData.chunk.name === 'app' ? 'index.[contenthash].js' : '[name].js';
    },
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/apps/bitcoin',
  },
  optimization: {
    minimize: true,
    usedExports: true
  }
};
