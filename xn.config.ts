import { defineConfig } from '@xn-sakina/meta'
import { resolve } from 'path'

const isProd = process.env.NODE_ENV === 'production'

export default defineConfig({
  alias: {
    '@utils': resolve(__dirname, './src/utils'),
    '@data': resolve(__dirname, './src/data'),
    '@assets': resolve(__dirname, './src/assets'),
    '@constants': resolve(__dirname, './src/constants'),
    '@hooks': resolve(__dirname, './src/hooks'),
  },
  compile: 'swc',
  cache: true,
  publicPath: isProd
    ? '//cdn.jsdelivr.net/gh/opq-osc/opqbot-homepage@gh-pages/'
    : '/',
})
