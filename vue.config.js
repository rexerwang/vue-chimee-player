module.exports = {
  // example
  pages: {
    index: {
      entry: 'example/main.js'
    }
  },
  // lib
  chainWebpack(config) {
    if (config.get('mode') === 'development') return

    config.output
      .library('VueChimeePlayer')
      .end()
      .externals({
        'chimee-player': {
          root: 'ChimeePlayer',
          umd: 'ChimeePlayer',
          commonjs: 'chimee-player',
          commonjs2: 'chimee-player'
        }
      })
  }
}
