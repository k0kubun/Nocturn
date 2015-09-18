BrowserWindow = require('browser-window')
Menu          = require('menu')

module.exports =
class MenuBuilder
  @build: (app) ->
    menu = Menu.buildFromTemplate(MenuBuilder.template(app))
    Menu.setApplicationMenu(menu)

  @template: (app) ->
    if process.platform == 'darwin'
      [MenuBuilder.commonMenu(app), MenuBuilder.macMenu]
    else
      [MenuBuilder.commonMenu(app)]

  @commonMenu: (app) -> {
    label: 'Nocturn',
    submenu: [
      {
        label: 'Open GitHub',
        click: ->
          require('shell').openExternal('https://github.com/k0kubun/Nocturn')
      },
      { type: "separator" },
      {
        label: 'Quit Nocturn',
        accelerator: 'Command+Q',
        click: ->
          app.quit()
      },
    ]
  }

  @macMenu: {
    label: 'Edit',
    submenu: [
      { label: "Undo", accelerator: "Command+Z", selector: "undo:" },
      { label: "Redo", accelerator: "Shift+Command+Z", selector: "redo:" },
      { type: "separator" },
      { label: "Cut", accelerator: "Command+X", selector: "cut:" },
      { label: "Copy", accelerator: "Command+C", selector: "copy:" },
      { label: "Paste", accelerator: "Command+V", selector: "paste:" },
      { label: "Select All", accelerator: "Command+A", selector: "selectAll:" },
    ],
  },

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
