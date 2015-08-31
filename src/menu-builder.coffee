BrowserWindow = require('browser-window')
Menu          = require('menu')

module.exports =
class MenuBuilder
  @build: (app) ->
    menu = Menu.buildFromTemplate(MenuBuilder.template(app))
    Menu.setApplicationMenu(menu)

  @template: (app) -> [
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
