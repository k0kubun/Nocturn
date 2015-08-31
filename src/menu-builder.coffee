BrowserWindow = require('browser-window')
Menu          = require('menu')

module.exports =
class MenuBuilder
  @build: ->
    menu = Menu.buildFromTemplate(MenuBuilder.template)
    Menu.setApplicationMenu(menu)

  @template: [
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
