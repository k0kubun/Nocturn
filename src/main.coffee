mainWindow    = null
app           = require('app')
Menu          = require('menu')
BrowserWindow = require('browser-window')

app.on('window-all-closed', ->
  if process.platform != 'darwin'
    app.quit()
)

app.on('ready', ->
  mainWindow = new BrowserWindow({ width: 350, height: 640 })
  mainWindow.loadUrl('file://' + __dirname + '/index.html')
  mainWindow.on('closed', ->
    mainWindow = null
  )

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
