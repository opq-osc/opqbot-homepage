/**
 * @deprecated [2021-12-21]: 使用 iphone13 (ios 15) 测试已无兼容性问题，放弃使用此 hack 脚本
 */

const postcss = require('postcss')
const fs = require('fs')
const path = require('path')
const execa = require('execa')
const chalk = require('chalk')

const cssDirPath = path.resolve(__dirname, '../build/static/css')

const log = console.log

const needCssPolyfillChunkIds = ['main']

;(async () => {
  // build
  log(chalk.cyan('[Build] 🚀 start project build...'))

  await execa.command('yarn build:project', {
    stdio: 'inherit',
  })

  log(chalk.green('[Build] 🌸 project build complete'))

  // css polyfill
  log(chalk.cyan('[Build] 🍬 start css polyfill...'))

  const isCssDirExist = fs.existsSync(cssDirPath)
  if (!isCssDirExist) {
    log(chalk.red('[Build] ❌ css output file not exist'))
    return
  }

  const files = fs.readdirSync(cssDirPath)
  files.forEach((file) => {
    if (!needCssPolyfillChunkIds.some((chunkId) => file.includes(chunkId))) {
      return
    }
    const absolutePath = path.resolve(cssDirPath, file)
    const content = fs.readFileSync(absolutePath, 'utf-8')
    postcss([
      /**
       * 这个 polyfill 有点大，会让 10k css 变成 20k
       * 主要是针对手机端，后面手机浏览器内核升级了可以去掉
       * @refer https://caniuse.com/flexbox-gap
       */
      require('flex-gap-polyfill'),
      // 压缩用
      require('cssnano')({
        preset: 'default',
      }),
    ])
      .process(content, { from: undefined })
      .then(({ css }) => {
        fs.writeFileSync(absolutePath, css)

        log(chalk.green(`[Build] ⭐ css polyfill ${file} succeed`))
      })
  })
})()
