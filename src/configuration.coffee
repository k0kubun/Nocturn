BrowserWindow = require('browser-window')

configWindow = null

module.exports =
class Configuration
  @open: ->
    return if configWindow

    configWindow = new BrowserWindow({ width: 400, height: 300 })
    configWindow.loadUrl('file://' + __dirname + '/config.html')
