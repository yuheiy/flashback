const webpack = require('webpack')
const BabiliPlugin = require("babili-webpack-plugin")

const dev = process.env.NODE_ENV !== 'production'

module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.scss$/,
      loader: 'emit-file-loader',
      options: {
        name: 'dist/[path][name].[ext]',
      },
    }, {
      test: /\.scss$/,
      use: [
        'raw-loader',
        `postcss-loader${dev ? '?sourceMap=inline' : ''}`,
        {
          loader: 'sass-loader',
          options: {
            importer: require('node-sass-globbing'),
            sourceMap: dev,
          },
        },
      ],
    })

    // https://github.com/zeit/next.js/issues/1195
    if (!dev) {
      config.plugins = config.plugins
      .filter(plugin => plugin.constructor.name !== 'UglifyJsPlugin')

      config.plugins.push(new BabiliPlugin())
    }

    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.PRISMIC_API_ENDPOINT': JSON.stringify(process.env.PRISMIC_API_ENDPOINT),
        'process.env.PRISMIC_ACCESS_TOKEN': JSON.stringify(process.env.PRISMIC_ACCESS_TOKEN),
        'process.env.PRISMIC_CUSTOM_TYPE': JSON.stringify(process.env.PRISMIC_CUSTOM_TYPE),
      })
    )

    return config
  },
}
