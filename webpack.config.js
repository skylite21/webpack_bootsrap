const webpack = require('webpack'); //to access built-in plugins
const path = require('path');


const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");
var node_dir = __dirname + '/node_modules';


const config = {
  entry: './src/js/app.js',
  output: { 
    path: path.resolve(__dirname, 'build'),
    filename: 'js/bundle.js',
  },
  devtool: 'source-map',
  module: {
    rules: [{
        use: 'babel-loader',
        exclude: node_dir,
        test: /\.js$/
      },
      {
        // Exports HTML as string
        test: /\.html$/,
        use: {
          loader:'html-loader',
          options: {
            minimize: true
          }
        }
      },
      {
        test: /\.(jpe?g|png)$/,
        use: 
        {
          loader: 'file-loader',
          options: {
            outputPath: './img/'
          }
        }
      },
      {  
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
             {
              loader: "css-loader", 
               options: {
                  sourceMap: true
              }
            },
            {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              sourceMap: true,
              plugins: (loader) => [
                require('postcss-import')({ root: loader.resourcePath }),
                require('autoprefixer')({ grid: true } ),
                require('cssnano')({comments: {removeAll: true}}),
                require('postcss-cssnext')()
                ]
              }
            },
            {
              loader: 'resolve-url-loader',
              options: {
                debug: true
              }
            },
            {
              loader: "sass-loader", options: {
                    sourceMap: true
                }
            },
          ],
        })
      },
    ]},
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default']
    }),
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true
    }),
    new ExtractTextPlugin({
      filename: './css/style.css',
      // https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/647
      allChunks: true // Enable this so postcssloader wont run twice if used in conjunction with extract-text plugin
    }),
    new webpack.LoaderOptionsPlugin({
        debug: true
    })
  ]
};


module.exports = config;
