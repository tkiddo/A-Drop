const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

const CssCommonLoader = ['style-loader', 'css-loader'];

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: 'development',
  // 配置开发服务器
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    // gzip压缩
    compress: true,
    port: 3000,
    open: true,
    // 启用hmr
    hot: true
  },
  // 配置source map,提示错误代码的准确信息
  // eval-source-map / eval-cheap-module-source-map
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.md$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'sliver-md-loader',
            options: {
              mode: 'react',
              markdown: {
                xhtmlOut: true
              }
            }
          }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',
                  corejs: {
                    version: '3.6',
                    proposals: true
                  }
                },
                '@babel/preset-react'
              ]
            ],
            // 第二次构建时会读取缓存
            cacheDirectory: true,
            // 动态导入语法
            plugins: ['@babel/plugin-syntax-dynamic-import']
          }
        }
      },
      {
        test: /\.css$/,
        use: [...CssCommonLoader]
      },
      {
        test: /\.less$/,
        use: [...CssCommonLoader, 'less-loader']
      },
      {
        test: /\.s[ac]ss$/,
        use: [...CssCommonLoader, 'sass-loader']
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // eslint-disable-next-line no-unused-vars
              name(resourcePath, resourceQuery) {
                // `resourcePath` - `/absolute/path/to/file.js`
                // `resourceQuery` - `?foo=bar`

                if (process.env.NODE_ENV === 'development') {
                  return '[path][name].[ext]';
                }
                return '[contenthash].[ext]';
              },
              outputPath: 'media',
              limit: 8 * 1024
            }
          }
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        exclude: /\.(css|less|scss|js|html|jpg|png|gif|md)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'static'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, 'dll/manifest.json')
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets/images/md'),
          to: path.resolve(__dirname, 'dist/media/md')
        }
      ]
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico'
    }),
    new AddAssetHtmlPlugin({
      filepath: path.resolve(__dirname, 'dll/react.js')
    })
  ]
};
