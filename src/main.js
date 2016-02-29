'use strict';

import Authentication from './utils/authentication'
import { app, BrowserWindow } from 'electron'
let mainWindow = null;

app.on('ready', () => {
  if (mainWindow) return;

  Authentication.authorized(() => {
    mainWindow = new BrowserWindow({ width: 350, height: 640 });
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
