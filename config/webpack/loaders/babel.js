module.exports = {
  test: /\.js(\.erb)?$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader?cacheDirectory',
  },
};
