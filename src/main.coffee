mainWindow     = null
app            = require('app')
Authentication = require('./authentication')
BrowserWindow  = require('browser-window')
JsonLoader     = require('./json-loader')
MenuBuilder    = require('./menu-builder')

app.on('ready', ->
  return if mainWindow

  mainRoutine = ->
    mainWindow = new BrowserWindow({ width: 350, height: 640 })
    mainWindow.loadUrl('file://' + __dirname + '/index.html')
    mainWindow.on('closed', ->
      mainWindow = null
      app.quit()
    )
    MenuBuilder.build()

  accessToken = JsonLoader.read('access_token.json')
  if accessToken['accessToken']
    mainRoutine()
  else
    new Authentication (token) ->
      JsonLoader.write('access_token.json', token)
      mainRoutine()
)

app.on('window-all-closed', ->
  # noop
)
