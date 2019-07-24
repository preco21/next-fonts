# Next.js + Fonts

> Import font files in your Next.js project.

The fonts will be added to `.next/static/fonts`. Also a chunk hash is added to file names in production.

## Install

```bash
$ npm install --dev @preco21/next-fonts
```

## Usage

In `next.config.js`:

```js
const withFonts = require('@preco21/next-fonts')
module.exports = withFonts()
```

Optionally extend the config as you like:

```js
const withFonts = require('@preco21/next-fonts')
module.exports = withFonts({
  webpack(config, options) {
    return config
  }
})
```

## Options

This plugin accepts a number of options that you can customize the build:

```js
module.exports = withFonts({
  extensions: ['woff', 'woff2'],
  urlLoaderOptions: {
    limit: 10000
  }
})
```

### `extensions`

Type: `string[]`<br />
Default: `['woff', 'woff2', 'eot', 'ttf', 'otf']`

Specify a extension set on which files to identify as a fonts.

### `include`

Type: `RegExp`

Same as the original webpack's [Rule.include](https://webpack.js.org/configuration/module/#ruleinclude).

### `exclude`

Type: `RegExp`

Same as the original webpack's [Rule.exclude](https://webpack.js.org/configuration/module/#ruleexclude).

### `urlLoaderOptions`

Type: `object`

Same as the original [`url-loader`'s option](https://github.com/webpack-contrib/url-loader).

### `assetPrefix`

Type: `string`<br />
Default: `''`

Same as the original [`assetPrefix` option](https://github.com/zeit/next.js/#cdn-support-with-asset-prefix), consumed in the plugin to resolve the domain the Next.js is hosted on.

## License

[MIT](https://preco.mit-license.org/)
