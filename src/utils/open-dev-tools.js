const remote   = require('remote');
const electron = remote.require('electron');
const BrowserWindow = electron.BrowserWindow;

BrowserWindow.getFocusedWindow().toggleDevTools()
