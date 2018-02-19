# Serverless Webpack Dev Server
Serverless Webpack Dev Server is a [serverless](https://serverless.com) plugin for development use with [serverless offline](https://github.com/dherault/serverless-offline). The plugin allows you to run a webpack dev server alongside `serverless offline`, and is primarily for use cases where you want your functions to render html with built assets (css/js).

With this plugin simply adding a webpack.config.js file and running `sls offline` will watch for changes and rebuild static assets on-save.

## Installation
First, make sure you have [serverless offline](https://github.com/dherault/serverless-offline) installed in your serverless app.

Then, install the plugin via/npm.
```
npm install serverless-webpack-dev-server
```

## Usage
Once installed, add the plugin to your `serverless.yml` file. Make sure it comes before serverless-offline.

```yml
plugins:
  - serverless-webpack-dev-server
  - serverless-offline
```

Finally, under `custom` variables, add your configuration
```yml
custom:
  webpack:
    config: './webpack.config.js'
    port: 3001 # Optional. Defaults to 3001
    options:
      publicPath: '/dist'
```
**Options**
- `config` _(required)_ The location of your webpack config file.
- `port` _(optional)_ The port to run the dev server on. Default is 3001.
- `options` _(required)_ Options to pass to webpack dev middleware. `publicPath` is required. [See a list of options here.](https://github.com/webpack/webpack-dev-middleware#options)

To run, simply run `sls offline` as usual. By default, your bundle will live on `http://localhost:3001` at the `publicPath` defined in your config.

