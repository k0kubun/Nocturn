BrowserWindow = require('browser-window')
Configuration = require('./configuration')
Menu          = require('menu')

module.exports =
class MenuBuilder
  @build: (app) ->
    menu = Menu.buildFromTemplate(MenuBuilder.template(app))
    Menu.setApplicationMenu(menu)

  @template: (app) -> [
    {
      label: 'Nocturn',
      submenu: [
        {
          label: 'Configuration',
          accelerator: 'Command+,',
          click: ->
            Configuration.open()
        },
        {
          label: 'Quit Nocturn',
          accelerator: 'Command+Q',
          click: ->
            app.quit()
        }
      ]
    },
  ]

  # For debug
  @devTool: {
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
