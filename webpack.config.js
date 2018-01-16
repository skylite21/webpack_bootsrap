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
    publicPath: ""
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        exclude: /node_modules/,
        test: /\.js$/
      },
      {
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: {
            loader: 'css-loader',
            options: {
              minimize: false
            }
          }
        }),
        test: /\.css$/
      },
      {       
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
             {
              loader: "css-loader", options: {
                  sourceMap: false
              }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: (loader) => [
                require('postcss-import')({ root: loader.resourcePath }),
                require('autoprefixer')({ grid: true } ),
                require('cssnano')({comments: {removeAll: true}}),
                require('postcss-cssnext')()
              ]
            }
          },
            {
              loader: "sass-loader", options: {
                  sourceMap: false
            }
          }],
        })
      },
      //file loader
      {
				test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
				loader: "file-loader",
        options: {
          outputPath: 'assets/',
          publicPath: '../'
        }
			},
      //url loader
      {
        test:/\.(jpe?g|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: { 
              limit: 1200,
              outputPath: 'img/',
              publicPath: '../'

            }
          },
          'image-webpack-loader',
        ]
      },
			{
				test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/font-woff',
          outputPath: 'assets/',
          publicPath: '../'
        }
			}, {
				test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/font-woff',
          outputPath: 'assets/',
          publicPath: '../'
        }
			}, {
				test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/font-otf',
          outputPath: 'assets/',
          publicPath: '../'
        }
			}, {
				test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/octet-stream',
          outputPath: 'assets/',
          publicPath: '../'
        }
			}, 
      {
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'image/svg+xml',
          outputPath: 'assets/',
          publicPath: '../'
        }
			},
      {
        test: /\.html$/,
        use: {
          loader:'html-loader',
          options: {
            minimize: false
          }
        }
      }
    ] 
  },
  plugins: [
    // find any files that where extracted and save it to this file
    new ExtractTextPlugin('css/style.css'),
    new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery',
          'window.jQuery': 'jquery',
          Popper: ['popper.js', 'default']
    }),
    new HtmlWebpackPlugin({
        filename: './index.html',
        template: 'src/index.html'
    }),
    new MinifyPlugin()
  ]
};


module.exports = config;
