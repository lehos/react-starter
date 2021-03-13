const path = require('path');

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const { getArgValue } = require('./utils');

const { NODE_ENV, REACT_FAST_REFRESH } = process.env;

const BUNDLE_ANALYZER = getArgValue('BUNDLE_ANALYZER');

const SOURCE_PATH = path.resolve(__dirname, 'src');
const BUILD_PATH = path.resolve(__dirname, 'build');

module.exports = function exports() {
  const plugins = [
    new HtmlPlugin({
      template: './src/static/index.html',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
    }),
  ];

  if (REACT_FAST_REFRESH === 'true') {
    plugins.push(new ReactRefreshWebpackPlugin());
  }

  if (BUNDLE_ANALYZER) {
    plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerHost: 'localhost',
        analyzerPort: 8081,
      })
    );
  }

  const resolveAlias = {
    '@': SOURCE_PATH,
  };

  return {
    mode: NODE_ENV,
    entry: './src/index.tsx',
    output: {
      path: BUILD_PATH,
      publicPath: '/',
      filename: '[name].[chunkhash].js',
    },
    resolve: {
      alias: resolveAlias,
      extensions: ['.ts', '.tsx', '.js', '.json'],
    },
    module: {
      rules: [
        {
          test: /\.css?$/,
          include: path.resolve(__dirname, 'node_modules'),
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.tsx?$/,
          include: SOURCE_PATH,
          loader: 'babel-loader',
        },
        {
          test: /\.(woff2?|jpg|png)$/,
          include: SOURCE_PATH,
          loader: 'file-loader',
        },
        {
          test: /\.svg$/,
          use: ['@svgr/webpack'],
        },
      ],
    },
    plugins,
    devtool: NODE_ENV === 'production' ? false : 'source-map',
    devServer: {
      port: 8080,
      historyApiFallback: true,
      compress: true,
      clientLogLevel: 'silent',

      stats: {
        chunks: false,
        modules: false,
        assets: false,
      },
    },
    stats: false,
  };
};
