const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const {
  BASE_DIRECTORY,
  OUTPUT_DIRECTORY_NAME,
  OUTPUT_PATH,
  ENTRY_FILE_PATHS,
} = require('./constants');

module.exports = {
  entry: {
    content: ENTRY_FILE_PATHS.CONTENT,
    background: ENTRY_FILE_PATHS.BACKGROUND,
  },
  output: {
    path: OUTPUT_PATH,
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(
      [
        OUTPUT_DIRECTORY_NAME,
      ],
      {
        root: BASE_DIRECTORY,
      },
    ),
    new CopyWebpackPlugin([
      {
        from: 'source/manifest.json',
      },
      {
        from: 'source/icons',
        to: 'icons',
        toType: 'dir',
      },
    ]),
  ],
};
