const _ = require('lodash')
const path = require('path')
const webpack = require('webpack')
const express = require('express')
const middleware = require('webpack-dev-middleware')

class ServerlessWebpackDevServer {
  constructor(serverless, options) {
    const configPath = _.get(serverless, 'service.custom.webpack.config', './webpack.config.js')
    const config = require(path.join(serverless.config.servicePath, configPath))

    this.compiler = webpack(config)
    this.log = serverless.cli.log.bind(serverless.cli)
    this.middlewareOptions = _.get(serverless, 'service.custom.webpack.options', {})
    this.port = _.get(serverless, 'service.custom.webpack.port', 3001)
    this.app = express()

    this.hooks = {
      'before:offline:start': this.start.bind(this),
      'before:offline:start:end': this.end.bind(this)
    }
  }

  start() {
    this.app.use(middleware(this.compiler, _.defaults(this.middlewareOptions, {
      stats: 'minimal',
      publicPath: '/'
    })))

    this.app.listen(this.port, () => this.log(`Webpack Dev Server listening on http://localhost:${this.port}`))
  }

  end() {
    this.app.close()
  }
}

module.exports = ServerlessWebpackDevServer
