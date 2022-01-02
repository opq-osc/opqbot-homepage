const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: { version: '3.20' },
      },
    ],
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript',
  ],
  plugins: [isDev && require.resolve('react-refresh/babel')].filter(Boolean),
  compact: isDev ? false : 'auto',
}
