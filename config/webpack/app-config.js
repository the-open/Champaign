require('dotenv').config({ path: 'env.yml' });
const webpack = require('webpack');
const merge = require('webpack-merge');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const PROD = process.env.NODE_ENV === 'production';
const DEV = process.env.NODE_ENV === 'development';

let config = {
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      minChunks: 3,
    }),
  ],
  externals: {
    backbone: 'window.Backbone',
    jquery: 'window.$',
    'champaign-i18n': 'window.I18n',
    'braintree-web': 'window.BraintreeWeb',
  },
};

if (PROD) {
  config = merge(config, {
    plugins: [new webpack.optimize.ModuleConcatenationPlugin()],
  });
}

if (DEV) {
  config = merge(config, {
    plugins: [new webpack.HotModuleReplacementPlugin()],
  });
}

if (process.env.WEBPACK_BUNDLE_ANALYZER) {
  config = merge(config, {
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: DEV ? 'server' : 'static',
        defaultSizes: PROD ? 'gzip' : 'parsed',
        generateStatsFile: true,
        openAnalyzer: false,
      }),
    ],
  });
}
module.exports = config;
