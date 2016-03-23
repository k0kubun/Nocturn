import { app, shell, Menu } from 'electron';

export default class MenuBuilder {
  static build(window) {
    if (process.platform === 'darwin') {
      let template = this.templateForDarwin(window);
      let menu = Menu.buildFromTemplate(template);
      Menu.setApplicationMenu(menu);
    } else {
      let template = this.templateForOthers(window);
      let menu = Menu.buildFromTemplate(template);
      window.setMenu(menu);
    }
  }

  static templateForDarwin(window) {
    return [
      {
        label: 'Nocturn',
        submenu: [
          { label: 'Open GitHub', click() { shell.openExternal('http://github.com/k0kubun/Nocturn'); } },
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
          { label: 'Toggle Full Screen', accelerator: 'Ctrl+Command+F', click() { window.setFullScreen(!window.isFullScreen()); } },
          { label: 'Toggle Developer Tools', accelerator: 'Alt+Command+I', click() { window.toggleDevTools(); } },
        ] : [
          { label: 'Toggle Full Screen', accelerator: 'Ctrl+Command+F', click() { window.setFullScreen(!window.isFullScreen()); } },
        ]
      }, {
        label: 'Tweet',
        submenu: [
          { label: 'Delete',   accelerator: 'Command+Backspace', click() { window.webContents.send('invoke-delete') } },
        ],
      }, {
        label: 'Timeline',
        submenu: [
          { label: 'Reload',           accelerator: 'Command+R',       click() { window.webContents.send('reload-timeline') } },
          { label: 'Next Tab',         accelerator: 'Command+Shift+]', click() { window.webContents.send('select-next-tab') } },
          { label: 'Previous Tab',     accelerator: 'Command+Shift+[', click() { window.webContents.send('select-prev-tab') } },
          { label: 'Next Account',     accelerator: 'Command+J',       click() { window.webContents.send('select-next-account') } },
          { label: 'Previous Account', accelerator: 'Command+K',       click() { window.webContents.send('select-prev-account') } },
        ],
      }, {
        label: 'Window',
        submenu: [
          { label: 'Minimize', accelerator: 'Command+M', selector: 'performMiniaturize:' },
          { label: 'Close', accelerator: 'Command+W', selector: 'performClose:' },
          { type: 'separator' },
          { label: 'Bring All to Front', selector: 'arrangeInFront:' },
        ]
      },
      this.helpMenu(),
    ];
  }

  static templateForOthers(window) {
    return [
      {
        label: 'Nocturn',
        submenu: [
          { label: 'Open GitHub', click() { shell.openExternal('http://github.com/k0kubun/Nocturn'); } },
          { type: 'separator' },
          { label: 'Quit', accelerator: 'Ctrl+W', click() { window.close(); } },
        ],
      }, {
        label: 'View',
        submenu: (process.env.NODE_ENV === 'development') ? [
          { label: '&Reload', accelerator: 'Ctrl+R', click() { window.reload(); } },
          { label: 'Toggle Full Screen', accelerator: 'F11', click() { window.setFullScreen(!window.isFullScreen()); } },
          { label: 'Toggle Developer Tools', accelerator: 'Alt+Ctrl+I', click() { window.toggleDevTools(); } },
        ] : [
          { label: 'Toggle Full Screen', accelerator: 'F11', click() { window.setFullScreen(!window.isFullScreen()); } },
        ]
      }, {
        label: 'Tweet',
        submenu: [
          { label: 'Delete',   accelerator: 'Alt+Backspace', click() { window.webContents.send('invoke-delete') } },
        ],
      }, {
        label: 'Timeline',
        submenu: [
          { label: 'Reload',           accelerator: 'Ctrl+R', click() { window.webContents.send('reload-timeline') } },
          { label: 'Next Tab',         accelerator: 'Alt+P',  click() { window.webContents.send('select-next-tab') } },
          { label: 'Previous Tab',     accelerator: 'Alt+O',  click() { window.webContents.send('select-prev-tab') } },
          { label: 'Next Account',     accelerator: 'Alt+J',  click() { window.webContents.send('select-next-account') } },
          { label: 'Previous Account', accelerator: 'Alt+K',  click() { window.webContents.send('select-prev-account') } },
        ],
      },
      this.helpMenu(),
    ];
  }

  static helpMenu() {
    return {
      label: 'Help',
      submenu: [
        { label: 'Search Issues', click() { shell.openExternal('https://github.com/k0kubun/Nocturn/issues'); } },
      ],
    };
  }
}
