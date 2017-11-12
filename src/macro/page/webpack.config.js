const { join } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

/* Setup */
const IS_PRODUCTION = process.argv.indexOf('-p') > -1;
const NAME_SUFFIX = new Date().getTime() + (IS_PRODUCTION ? '.min' : '');
const PORT = 8080;
const PATH_PROJECT = join(__dirname, '..', '..', '..');
const PATH_SOURCE = join(__dirname, '.');
const PATH_BUILD = join(PATH_PROJECT, 'output', 'page');
const PATH_DATA = 'data';
const PATH_ASSETS = 'assets';

const config = {
  entry: join(PATH_SOURCE, 'index.js'),
  output: {
    path: PATH_BUILD,
    filename: join(PATH_ASSETS, `index${NAME_SUFFIX}.js`)
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        extractCSS: true,
        loaders: {
          // scss: 'vue-style-loader!css-loader!sass-loader',
          // sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
          css: ExtractTextPlugin.extract({
            use: 'css-loader',

            /* This is a dep of vue-loader, so no need to explicitly install if using npm3 */
            fallback: 'vue-style-loader'
          })
        }
      }
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'file-loader',
      options: {
        name: join(PATH_DATA, '[name].[ext]')
      }
    }, {
      test: /\.json$/i,
      loader: 'file-loader',
      options: {
        name: join(PATH_DATA, '[name].[ext]')
      }
    }]
  },
  plugins: [
    // new ExtractTextPlugin('main.css'),
    new ExtractTextPlugin(join(PATH_ASSETS, `main${NAME_SUFFIX}.css`)),
    new HtmlWebpackPlugin({
      template: join(PATH_SOURCE, 'index.html'),
      filename: 'index.html',
      allChunks: true
    }),
    new CleanWebpackPlugin([PATH_BUILD], {
      root: PATH_PROJECT,
      verbose: false,
      dry: false,
      exclude: ['data']
    })
  ],
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      'macros.json': join(PATH_PROJECT, 'output', 'minified.json'),
      'tagCategories.json': join(PATH_PROJECT, 'output', 'tagCategories.json'),
      'tagDefinitions.json': join(PATH_PROJECT, 'output', 'tagDefinitions.json')
    }
  },
  performance: {
    hints: false
  },
  stats: {
    children: false,
    hash: false,
    version: false,
    colors: true
  }
};

if (IS_PRODUCTION) {
  // http://vue-loader.vuejs.org/en/workflow/production.html
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  );
} else {
  require('serve-local')(PATH_BUILD, PORT);
  config.devtool = '#eval-source-map';
}

module.exports = config;
