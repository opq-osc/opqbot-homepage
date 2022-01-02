/**
 * @refer https://github.com/vercel/next.js/blob/7e370134fb46dede3809df664db95c603a5a2997/packages/next/taskfile-swc.js
 * @docs https://swc.rs/docs/configuration/swcrc
 */

const path = require('path')

module.exports = (isDev = false) => ({
  module: {
    type: 'es6',
    // If set to true, dynamic imports will be preserved.
    ignoreDynamic: true,
  },
  // polyfill
  ...(isDev
    ? {}
    : {
        env: {
          mode: 'usage', // or entry
          coreJs: 3,
          path: path.resolve(__dirname),
        },
      }),
  jsc: {
    parser: {
      syntax: 'typescript',
      dynamicImport: true,
      decorators: true,
      tsx: true,
    },
    loose: true, // works like babel-preset-env loose mode.
    target: 'es2015',
    externalHelpers: true,
    transform: {
      legacyDecorator: true,
      decoratorMetadata: true,
      react: {
        runtime: 'automatic', // classic
        throwIfNamespace: true,
        useBuiltins: true, // Use Object.assign() instead of _extends. Defaults to false.
        development: isDev,
      },
    },
  },
  sourceMaps: true,
})
