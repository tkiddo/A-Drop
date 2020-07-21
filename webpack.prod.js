const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const PostcssPresetEnv = require('postcss-preset-env');
const CopyPlugin = require('copy-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const webpack = require('webpack');
const pkg = require('./package.json');

// 决定browerslist用哪个模式
process.env.NODE_ENV = 'production';

const CssCommonLoader = [
  {
    loader: MiniCssExtractPlugin.loader,
    options: {
      // 配置路径寻找从当前目录的上一级开始
      publicPath: '../',
      hmr: process.env.NODE_ENV === 'development'
    }
  },
  'css-loader',
  {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      plugins: () => [PostcssPresetEnv()]
    }
  }
];

const getPublicPath = () => {
  if (pkg.homepage) {
    return pkg.homepage;
  }
  return '/';
};

module.exports = {
  entry: './src/index.js',
  output: {
    // chunkhash:如果打包来源于同一个chunk，那么hash值一样
    // contenthash:根据文件内容是否变化，来改变hash值
    filename: 'js/[name].[contenthash:10].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: getPublicPath()
  },
  mode: 'production',
  // 配置开发服务器
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    // gzip压缩
    compress: true,
    port: 3000
  },
  // source-map / cheap-module-source-map
  // devtool: 'cheap-module-source-map',
  // 可以将node_modules中代码单独打包一个chunk输出
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2,
          maxInitialRequests: 5, // The default limit is too small to showcase the effect
          minSize: 0 // This is example is too small to create commons chunks
        },
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10,
          enforce: true
        }
      }
    }
  },
  // externals: { react: 'React', 'react-dom': 'ReactDOM' },
  module: {
    rules: [
      {
        // 优先执行
        enforce: 'pre',
        test: /\.js$/,
        loader: 'eslint-loader',
        options: {
          fix: true
        },
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/
      },
      {
        // 所有文件只会有一个loader处理一个，注意：不能有两个配置处理同一个文件
        oneOf: [
          {
            test: /\.md$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'sliver-md-loader',
                options: {
                  mode: 'react'
                }
              }
            ]
          },
          {
            test: /\.(js|jsx)$/,
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
            },
            include: path.resolve(__dirname, 'src'),
            exclude: /node_modules/
          },
          {
            test: /\.css$/,
            use: [...CssCommonLoader]
          },
          {
            test: /\.less$/,
            use: [...CssCommonLoader, 'less-loader'],
            exclude: /node_modules/
          },
          {
            test: /\.s[ac]ss$/,
            use: [...CssCommonLoader, 'sass-loader'],
            exclude: /node_modules/
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
                  outputPath: 'media/images',
                  limit: 8 * 1024
                }
              }
            ],
            exclude: /node_modules/
          },
          {
            test: /\.html$/,
            loader: 'html-loader',
            exclude: /node_modules/
          },
          {
            exclude: /\.(css|less|scss|js|html|jpg|png|gif|md|json)$/,
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
      }
    ]
  },
  plugins: [
    // 告诉webpack哪些库不参与打包
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, 'dll/manifest.json')
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:10].css'
    }),
    new OptimizeCssAssetsPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public'),
          to: path.resolve(__dirname, 'dist'),
          globOptions: {
            ignore: ['index.html']
          }
        }
      ]
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico',
      // html压缩
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    }),
    new AddAssetHtmlPlugin({
      filepath: path.resolve(__dirname, 'dll/react.js'),
      outputPath: 'js',
      publicPath: './js'
    }),
    new CleanWebpackPlugin()
  ]
};
