const merge = require('webpack-merge');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const WebpackBuildNotifier = require('webpack-build-notifier');
const {
  BundleAnalyzerPlugin,
} = require('webpack-bundle-analyzer');

const common = require('./webpack.config.common');

module.exports = merge.smart(
  common,
  {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
      historyApiFallback: true,
    },
    plugins: [
      new BundleAnalyzerPlugin(),
      new WebpackBuildNotifier({
        title: 'DraftKings Chrome Extension Dev Build',
      }),
      new HardSourceWebpackPlugin(),
    ],
    watch: true,
  },
);
