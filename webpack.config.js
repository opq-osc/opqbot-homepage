const { defineConfig } = require('webpack-config-copilot')
const path = require('path')
const fs = require('fs-extra')
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent')
const { DefinePlugin, ProvidePlugin } = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const WebpackBar = require('webpackbar')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const lodash = require('lodash')

const esbuild = require('esbuild')
const { ESBuildMinifyPlugin } = require('esbuild-loader')
const swcLoader = 'swc-loader'
const swcConfig = require('./.swcrc.js')

const jsReg = /\.(js|jsx|ts|tsx)$/
const nodeModulesReg = /node_modules/
const [cssReg, cssModuleReg] = [/\.css$/, /\.module.css$/]
const [scssReg, scssModuleReg] = [/\.scss$/, /\.module.scss$/]
const [lessReg, lessModuleReg] = [/\.less$/, /\.module.less$/]
const svgReg = /\.(svg)(\?.*)?$/i
const fontReg = /\.(woff2?|eot|ttf|otf)(\?.*)?$/i
const imageReg = /\.(png|jpe?g|gif|webp)(\?.*)?$/i

const srcEntry = path.resolve(__dirname, 'src')
const outputDir = path.resolve(__dirname, 'dist')
const indexHtmlPath = path.resolve(__dirname, 'public/index.html')
const publicDirPath = path.resolve(__dirname, 'public')

const isDev = process.env.NODE_ENV === 'development'
const isOpenAnalyzer = false
const isOpenFilesystemCache = false
const isOpenModernBundleMode = true

const webpackCache = isOpenFilesystemCache
  ? defineConfig({
      cache: {
        type: 'filesystem',
        buildDependencies: {
          config: [__filename],
        },
      },
    })
  : {}
const styleLoader = isDev ? 'style-loader' : MiniCssExtractPlugin.loader
const cssLoader = 'css-loader'
const scssLoader = 'sass-loader'
const lessLoader = {
  loader: 'less-loader',
  options: {
    lessOptions: {
      javascriptEnabled: true,
    },
  },
}
const postcssConfigFile = path.resolve(__dirname, 'postcss.config.js')
const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      config: postcssConfigFile,
    },
  },
}
const cssLoaderModulesOption = {
  getLocalIdent: getCSSModuleLocalIdent,
}
const terserPlugin = new TerserPlugin({
  extractComments: false,
  terserOptions: {
    format: {
      comments: false,
    },
    compress: {
      drop_console: true,
    },
  },
})

// load env
loadEnv()

const publicPath = process.env.PUBLIC_URL
const title = 'OPQBot'

const prunePublicPath = `${lodash.trimEnd(publicPath, '/')}/` || '/'

module.exports = defineConfig({
  entry: srcEntry,
  output: {
    path: outputDir,
    filename: isDev ? 'js/[name].js' : 'js/[name].[contenthash:8].js',
    publicPath: prunePublicPath,
    chunkFilename: isDev
      ? 'js/[name].chunk.js'
      : 'js/[name].[contenthash:8].chunk.js',
    assetModuleFilename: 'assets/[name].[hash][ext]',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      '@': srcEntry,
      '@utils': path.resolve(__dirname, './src/utils'),
      '@data': path.resolve(__dirname, './src/data'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@constants': path.resolve(__dirname, './src/constants'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
    },
  },
  module: {
    rules: getRules(),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new DefinePlugin({
      'process.env.PUBLIC_PATH': JSON.stringify(prunePublicPath),
    }),
    new ProvidePlugin({
      process: 'process/browser',
    }),
    new HtmlWebpackPlugin({
      template: indexHtmlPath,
      title,
      PUBLIC_PATH: prunePublicPath,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: publicDirPath,
          to: outputDir,
          toType: 'dir',
          globOptions: {
            ignore: [indexHtmlPath, '.DS_Store'],
          },
        },
      ],
    }),
    new WebpackBar(),
    new MiniCssExtractPlugin({
      filename: isDev ? '[name].css' : 'css/[name].[contenthash].css',
      chunkFilename: isDev ? '[id].css' : 'css/[id].[contenthash].css',
    }),
    new ForkTsCheckerWebpackPlugin(),
    isOpenAnalyzer && new BundleAnalyzerPlugin(),
    isDev && new ReactRefreshWebpackPlugin({ overlay: false }),
  ].filter(Boolean),
  optimization: {
    minimize: !isDev,
    minimizer: getOpt(),
    ...(isDev
      ? {}
      : { splitChunks: getSplitChunksConfig(['react', 'antd', 'rc']) }),
  },
  devtool: isDev ? 'cheap-module-source-map' : false,
  devServer: {
    hot: true,
    port: process.env.PORT || 8080,
    host: '127.0.0.1',
    historyApiFallback: true,
    allowedHosts: 'all',
  },
  target: isDev ? 'web' : ['web', 'es5'],
  stats: 'errors-warnings',
  ...webpackCache,
})

function loadEnv() {
  const load = (dotenvFile) => {
    if (fs.existsSync(dotenvFile)) {
      require('dotenv-expand')(
        require('dotenv').config({
          path: dotenvFile,
        })
      )
    }
  }

  const willLoadEnvs = [
    path.resolve(__dirname, '.env'),
    path.resolve(__dirname, `.env.${process.env.NODE_ENV}`),
  ]
  willLoadEnvs.forEach((envFilePath) => {
    load(envFilePath)
  })
}

function getSplitChunksConfig(needExtractDepsName = []) {
  const depsSplit = {}

  needExtractDepsName.forEach((depName) => {
    depsSplit[depName] = {
      name: `chunk-${depName}`,
      priority: 20,
      test: new RegExp(`[\\/]node_modules[\\/]_?${depName}(.*)`),
    }
  })

  return {
    chunks: 'all',
    cacheGroups: {
      libs: {
        name: 'chunk-libs',
        test: /[\\/]node_modules[\\/]/,
        priority: 10,
        chunks: 'initial',
      },
      commons: {
        name: 'chunk-commons',
        test: path.resolve(__dirname, 'src/components'),
        minChunks: 3,
        priority: 5,
        reuseExistingChunk: true,
      },
      ...depsSplit,
    },
  }
}

function getRules() {
  return [
    // js / ts
    ...getHandleJsLoader(),
    // css
    {
      test: cssReg,
      exclude: cssModuleReg,
      use: [
        styleLoader,
        {
          loader: cssLoader,
          options: {
            importLoaders: 1,
          },
        },
        postcssLoader,
      ],
    },
    // css module
    {
      test: cssModuleReg,
      use: [
        styleLoader,
        {
          loader: cssLoader,
          options: {
            importLoaders: 1,
            modules: cssLoaderModulesOption,
          },
        },
        postcssLoader,
      ],
    },
    // scss
    {
      test: scssReg,
      exclude: scssModuleReg,
      use: [
        styleLoader,
        {
          loader: cssLoader,
          options: {
            importLoaders: 2,
          },
        },
        postcssLoader,
        scssLoader,
      ],
    },
    // scss module
    {
      test: scssModuleReg,
      use: [
        styleLoader,
        {
          loader: cssLoader,
          options: {
            importLoaders: 2,
            modules: cssLoaderModulesOption,
          },
        },
        postcssLoader,
        scssLoader,
      ],
    },
    // less
    {
      test: lessReg,
      exclude: lessModuleReg,
      use: [
        styleLoader,
        {
          loader: cssLoader,
          options: {
            importLoaders: 2,
          },
        },
        postcssLoader,
        lessLoader,
      ],
    },
    // less module
    {
      test: lessModuleReg,
      use: [
        styleLoader,
        {
          loader: cssLoader,
          options: {
            importLoaders: 2,
            modules: cssLoaderModulesOption,
          },
        },
        postcssLoader,
        lessLoader,
      ],
    },
    // svg
    {
      test: svgReg,
      use: ['@svgr/webpack'],
    },
    // image
    {
      test: imageReg,
      type: 'asset',
    },
    // font
    {
      test: fontReg,
      type: 'asset/resource',
    },
  ]
}

function getHandleJsLoader() {
  const babelLoaderConfig = {
    test: jsReg,
    loader: 'babel-loader',
    exclude: nodeModulesReg,
  }
  if (!isOpenModernBundleMode) {
    return [babelLoaderConfig]
  }

  const swcLoaderConfig = {
    test: jsReg,
    loader: swcLoader,
    options: swcConfig(isDev),
    exclude: nodeModulesReg,
  }
  return [swcLoaderConfig]
}

function getOpt() {
  if (isDev) {
    return []
  }

  if (!isOpenModernBundleMode) {
    return [terserPlugin, new CssMinimizerPlugin()]
  }

  return [
    new ESBuildMinifyPlugin({
      target: 'es2015',
      legalComments: 'none',
      css: true,
      implementation: esbuild,
    }),
  ]
}
