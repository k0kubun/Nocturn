mainWindow     = null
app            = require('app')
Authentication = require('./authentication')
BrowserWindow  = require('browser-window')
JsonLoader     = require('./json-loader')
Menu           = require('menu')

app.on('ready', ->
  return if mainWindow

  mainRoutine = ->
    mainWindow = new BrowserWindow({ width: 350, height: 640 })
    mainWindow.loadUrl('file://' + __dirname + '/index.html')
    mainWindow.on('closed', ->
      mainWindow = null
      app.quit()
    )

  accessToken = JsonLoader.read('access_token.json')
  if accessToken['accessToken']
    mainRoutine()
  else
    new Authentication (token) ->
      JsonLoader.write('access_token.json', token)
      mainRoutine()

  template = [
    {
      label: 'Quit',
      submenu: [
        {
          label: 'Quit Nocturn',
          accelerator: 'Command+Q',
          click: ->
            app.quit()
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Open DevTools',
          accelerator: 'Alt+Command+I',
          click: ->
            BrowserWindow.getFocusedWindow().toggleDevTools()
        }
      ]
    }
  ]
  menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
)

app.on('window-all-closed', ->
  # noop
)
