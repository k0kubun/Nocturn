app            = require('app')
BrowserWindow  = require('browser-window')

app.on('ready', ->
  mainWindow = new BrowserWindow({ width: 350, height: 640 })
  mainWindow.loadUrl('file://' + __dirname + '/index.html')
  mainWindow.on('closed', -> app.quit())
)

app.on('window-all-closed', ->
  # noop
)
