const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const path = require('path')
const fs = require('fs')

const isDev = process.env.NODE_ENV !== 'production'

const isPrintConfig = true
const isOpenAnalyzer = false

// index.html 文件默认标题
const title = 'OPQBot - 高效稳定的跨平台 AI 机器人框架'

module.exports = {
  babel: {
    plugins: ['babel-plugin-lodash', 'babel-plugin-styled-components'],
  },
  webpack: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@data': path.resolve(__dirname, './src/data'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@constants': path.resolve(__dirname, './src/constants'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
    },
    plugins: {
      add: [
        isDev && new ReactRefreshWebpackPlugin(),
        isOpenAnalyzer && new BundleAnalyzerPlugin(),
      ].filter(Boolean),
    },
    configure: (webpackConfig, { env, paths }) => {

      // 去除 chunk 的 '.chunk' 部分
      webpackConfig.output.chunkFilename =
        webpackConfig.output.chunkFilename.replace('.chunk', '')

      // 去除 console 和注释
      invade(webpackConfig.optimization.minimizer, 'TerserPlugin', (e) => {
        e.options.extractComments = false
        e.options.terserOptions.compress.drop_console = true
      })
      invade(webpackConfig.plugins, 'MiniCssExtractPlugin', (e) => {
        e.options.chunkFilename = e.options.chunkFilename.replace('.chunk', '')
      })

      // 替换标题
      invade(webpackConfig.plugins, 'HtmlWebpackPlugin', (e) => {
        e.options.title = title
      })

      webpackConfig.module.rules.forEach((rule) => {
        if (rule.oneOf) {
          rule.oneOf.unshift({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
          })
          // rule.oneOf.forEach((loader) => {
          //   const source = loader.test?.source
          //   const isScssModuleRule =
          //     source?.includes?.('module') && source?.includes?.('scss')
          //   if (isScssModuleRule) {
          //     const loaders = loader.use
          //     loaders.forEach((loader) => {
          //       const isCssLoader = loader?.loader?.includes?.('/css-loader/')
          //       if (isCssLoader) {
          //         const opts = loader.options
          //         opts.modules.localIdentName = "[hash:base64:5]"
          //         console.log('opts: ', opts);
          //       }
          //     })
          //   }
          // })
        }
      })

      // splitChunk 分包策略
      webpackConfig.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial', // only package third parties that are initially dependent
          },
          // commons: {
          //   name: 'chunk-commons',
          //   test: path.resolve('src/components'),
          //   minChunks: 3,
          //   priority: 5,
          //   reuseExistingChunk: true,
          // },
          react: {
            name: 'chunk-react',
            priority: 20,
            test: /[\\/]node_modules[\\/]_?react(.*)/,
          },
        },
      }

      isPrintConfig &&
        fs.writeFileSync(
          './config.json',
          JSON.stringify(webpackConfig, null, 2)
        )
      return webpackConfig
    },
  },
}

/**
 * @param target: 要遍历的对象
 * @param name: 插件名
 * @param callback: 回调函数，第一个参数为该插件对象
 * @return null
 */
function invade(target, name, callback) {
  target.forEach((item) => {
    // console.log(item)
    if (item.constructor.name === name) {
      callback(item)
    }
  })
}
