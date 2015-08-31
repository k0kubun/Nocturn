BrowserWindow = require('browser-window')

configWindow = null

module.exports =
class Configuration
  @open: ->
    return if configWindow

    configWindow = new BrowserWindow({ width: 240, height: 400 })
    configWindow.loadUrl('file://' + __dirname + '/config.html')
    configWindow.on('closed', -> configWindow = null)
