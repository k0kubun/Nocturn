'use strict';

import Authentication from './utils/authentication';
import MenuBuilder    from './utils/menu-builder';
import path           from 'path';
import { app, BrowserWindow, ipcMain, shell } from 'electron';

let mainWindow = null;

app.on('ready', () => {
  if (mainWindow) return;

  Authentication.authorized(() => {
    let options = {
      width:         350,
      height:        640,
      'min-width':   260,
    };
    if (process.platform === 'darwin') {
      Object.assign(options, { titleBarStyle: 'hidden' });
    } else if (process.platform === 'linux') {
      Object.assign(options, { icon: path.join(__dirname, '/../resources/Nocturn.png') });
    }

    mainWindow = new BrowserWindow(options);
    mainWindow.webContents.on('new-window', (event, url) => {
      event.preventDefault();
      shell.openExternal(url);
    })
    mainWindow.loadURL(`file://${__dirname}/index.html`);
    MenuBuilder.build(mainWindow);

    mainWindow.on('closed', () => {
      app.quit();
    });

    if (process.env.NODE_ENV === 'development') {
      mainWindow.webContents.on('devtools-opened', () => {
        setImmediate(() => {
          mainWindow.focus();
        });
      });
      mainWindow.openDevTools();
    }
  });
});

app.on('window-all-closed', () => {});

ipcMain.on('start-authentication', (event) => {
  new Authentication((token) => {
    Authentication.addToken(token, () => {
      event.sender.send('finish-authentication', token);
    })
  })
})
