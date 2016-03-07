'use strict';

import Authentication from './utils/Authentication'
import { app, BrowserWindow, ipcMain, shell } from 'electron'

let mainWindow = null;

app.on('ready', () => {
  if (mainWindow) return;

  Authentication.authorized(() => {
    mainWindow = new BrowserWindow({
      width:  350,
      height: 640,
      titleBarStyle: process.platform === 'darwin' ? 'hidden' : 'normal',
    });
    mainWindow.webContents.on('new-window', (event, url) => {
      event.preventDefault();
      shell.openExternal(url);
    })
    mainWindow.loadURL(`file://${__dirname}/app.html`);

    mainWindow.on('closed', () => {
      app.quit();
    });

    if (process.env.NODE_ENV === 'development') {
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
