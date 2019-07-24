'use strict';

module.exports = (nextConfig = {}) =>
  Object.assign({}, nextConfig, {
    webpack(config, options) {
      if (!options.defaultLoaders) {
        throw new Error(
          'This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade',
        );
      }

      const {dev, isServer} = options;
      const {
        extensions = ['woff', 'woff2', 'eot', 'ttf', 'otf'],
        include,
        exclude,
        urlLoaderOptions,
        assetPrefix = '',
      } = nextConfig;

      const fileExtensions = Array.from(new Set(extensions));
      const testPattern = new RegExp(`\\.+(${fileExtensions.join('|')})$`);

      config.module.rules.push({
        test: testPattern,
        include,
        exclude,
        loader: 'url-loader',
        options: {
          limit: 8192,
          publicPath: `${assetPrefix}/_next/static/fonts`,
          outputPath: `${isServer ? '../' : ''}static/fonts/`,
          name: dev ? '[name].[ext]' : '[name].[contenthash:8].[ext]',
          ...urlLoaderOptions,
        },
        issuer(issuer) {
          if (issuer.match(/pages[\\/]_document\.js$/)) {
            throw new Error(
              'You can not import FONT files in pages/_document.js, use pages/_app.js instead.',
            );
          }

          return true;
        },
      });

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options);
      }

      return config;
    },
  });
