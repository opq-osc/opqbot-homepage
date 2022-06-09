import { defineConfig } from '@xn-sakina/meta'
import { resolve } from 'path'

const isProd = process.env.NODE_ENV === 'production'

export default defineConfig({
  // FIXME: 历史遗留，太多 alias 了
  alias: getDirAliasMap(['utils', 'data', 'assets', 'constants', 'hooks']),
  compile: 'swc',
  cssMinify: 'parcelCss',
  jsMinify: 'esbuild',
  cache: true,
  publicPath: isProd
    ? '//fastly.jsdelivr.net/gh/opq-osc/opqbot-homepage@gh-pages/'
    : '/',
})

function getDirAliasMap(dirs: string[]) {
  const alias: Record<string, string> = {}
  dirs.forEach((dir) => {
    alias[`@${dir}`] = resolve(__dirname, `./src/${dir}`)
  })
  return alias
}
