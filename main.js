'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
let mainWindow = null;

app.on('ready', () => {
  mainWindow = new BrowserWindow({ width: 350, height: 640 });
  mainWindow.loadURL(`file://${__dirname}/app/app.html`);

  mainWindow.on('closed', () => {
    app.quit();
  });
});

app.on('window-all-closed', () => {});
