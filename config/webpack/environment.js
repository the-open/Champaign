const { environment } = require('@rails/webpacker');
const dotenv = require('dotenv');
const webpack = require('webpack');
const custom = require('./custom.js');

const dotenvFiles = [
  `.env.${process.env.NODE_ENV}.local`,
  `.env.${process.env.NODE_ENV}`,
  '.env.local',
  '.env',
];

dotenvFiles.forEach(dotenvFile => {
  dotenv.config({ path: dotenvFile, silent: true });
});

environment.config.merge(custom);
environment.plugins.append(
  'Environment',
  new webpack.EnvironmentPlugin(JSON.parse(JSON.stringify(process.env)))
);

// Use expose-loader to expose jquery, lodash, backbone to global (window)
environment.loaders.append('expose', {
  test: require.resolve('jquery'),
  use: [
    {
      loader: 'expose-loader',
      options: '$',
    },
    {
      loader: 'expose-loader',
      options: 'jQuery',
    },
  ],
});

// split common libraries into vendor
environment.config.merge({
  optimization: {
    splitChunks: {
      cacheGroups: {
        ex: {
          test: (...args) => {
            console.log('ARGS:', args);
            return false;
          },
        },
        vendor: {
          name: 'vendor',
          test: /node_modules/,
          minSize: 50000,
          minChunks: 4,
          chunks: 'all',
          priority: -10,
        },
        common: {
          name: 'common',
          chunks: 'all',
          minChunks: 3,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
});

module.exports = environment;
