import { shell, Menu } from 'electron';

export default class MenuBuilder {
  static build(mainWindow) {
    if (process.platform === 'darwin') {
      let template = this.templateForDarwin(mainWindow);
      let menu = Menu.buildFromTemplate(template);
      Menu.setApplicationMenu(menu);
    } else {
      let template = this.templateForOthers(mainWindow);
      let menu = Menu.buildFromTemplate(template);
      mainWindow.setMenu(menu);
    }
  }

  static templateForDarwin(mainWindow) {
    return [
      {
        label: 'Electron',
        submenu: [
          { label: 'About ElectronReact', selector: 'orderFrontStandardAboutPanel:' },
          { type: 'separator' },
          { label: 'Services', submenu: [] },
          { type: 'separator' },
          { label: 'Hide ElectronReact', accelerator: 'Command+H', selector: 'hide:' },
          { label: 'Hide Others', accelerator: 'Command+Shift+H', selector: 'hideOtherApplications:' },
          { label: 'Show All', selector: 'unhideAllApplications:' },
          { type: 'separator' },
          { label: 'Quit', accelerator: 'Command+Q', click() { app.quit(); } },
        ],
      }, {
        label: 'Edit',
        submenu: [
          { label: 'Undo', accelerator: 'Command+Z', selector: 'undo:' },
          { label: 'Redo', accelerator: 'Shift+Command+Z', selector: 'redo:' },
          { type: 'separator' },
          { label: 'Cut', accelerator: 'Command+X', selector: 'cut:' },
          { label: 'Copy', accelerator: 'Command+C', selector: 'copy:' },
          { label: 'Paste', accelerator: 'Command+V', selector: 'paste:' },
          { label: 'Select All', accelerator: 'Command+A', selector: 'selectAll:' },
        ],
      }, {
        label: 'View',
        submenu: (process.env.NODE_ENV === 'development') ? [
          { label: 'Reload', accelerator: 'Command+R', click() { mainWindow.restart(); } },
          { label: 'Toggle Full Screen', accelerator: 'Ctrl+Command+F', click() { mainWindow.setFullScreen(!mainWindow.isFullScreen()); } },
          { label: 'Toggle Developer Tools', accelerator: 'Alt+Command+I', click() { mainWindow.toggleDevTools(); } },
        ] : [
          { label: 'Toggle Full Screen', accelerator: 'Ctrl+Command+F', click() { mainWindow.setFullScreen(!mainWindow.isFullScreen()); } },
        ]
      }, {
        label: 'Window',
        submenu: [
          { label: 'Minimize', accelerator: 'Command+M', selector: 'performMiniaturize:' },
          { label: 'Close', accelerator: 'Command+W', selector: 'performClose:' },
          { type: 'separator' },
          { label: 'Bring All to Front', selector: 'arrangeInFront:' },
        ]
      }, {
        label: 'Help',
        submenu: [
          { label: 'Learn More', click() { shell.openExternal('http://electron.atom.io'); } },
          { label: 'Documentation', click() { shell.openExternal('https://github.com/atom/electron/tree/master/docs#readme'); } },
          { label: 'Community Discussions', click() { shell.openExternal('https://discuss.atom.io/c/electron'); } },
          { label: 'Search Issues', click() { shell.openExternal('https://github.com/atom/electron/issues'); } },
        ]
      },
    ];
  }

  static templateForOthers(mainWindow) {
    return [
      {
        label: 'Nocturn',
        submenu: [
          { label: 'Quit', accelerator: 'Ctrl+W', click() { mainWindow.close(); } },
        ],
      }, {
        label: 'View',
        submenu: (process.env.NODE_ENV === 'development') ? [
          { label: '&Reload', accelerator: 'Ctrl+R', click() { mainWindow.reload(); } },
          { label: 'Toggle Full Screen', accelerator: 'F11', click() { mainWindow.setFullScreen(!mainWindow.isFullScreen()); } },
          { label: 'Toggle Developer Tools', accelerator: 'Alt+Ctrl+I', click() { mainWindow.toggleDevTools(); } },
        ] : [
          { label: 'Toggle Full Screen', accelerator: 'F11', click() { mainWindow.setFullScreen(!mainWindow.isFullScreen()); } },
        ]
      }, {
        label: 'Tweet',
        submenu: [
          { label: 'Reply', accelerator: 'Enter', click() { console.log('stub'); } },
        ]
      }, {
        label: 'Help',
        submenu: [
          { label: 'Nocturn Homepage', click() { shell.openExternal('http://github.com/k0kubun/Nocturn'); } },
          { label: 'Search Issues', click() { shell.openExternal('https://github.com/k0kubun/Nocturn/issues'); } },
        ],
      },
    ];
  }
}