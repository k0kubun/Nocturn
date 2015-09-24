mainWindow     = null
app            = require('app')
Authentication = require('./authentication')
BrowserWindow  = require('browser-window')
MenuBuilder    = require('./menu-builder')

app.on('ready', ->
  return if mainWindow

  Authentication.authorized ->
    if process.platform == 'darwin'
      mainWindow = new BrowserWindow({ width: 350, height: 640, 'title-bar-style': 'hidden' })
    else
      mainWindow = new BrowserWindow({ width: 350, height: 640 })
    mainWindow.loadUrl('file://' + __dirname + '/timeline.html')
    mainWindow.on('closed', -> app.quit())
    MenuBuilder.build(app)
)

app.on('window-all-closed', ->
  # noop
)
