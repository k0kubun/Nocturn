var app, path, BrowserWindow;

app = require('app');
path = require('path');
BrowserWindow = require('browser-window');

class Application {
  constructor() {
    app.on('ready', () => this.onReady());
    app.on('window-all-closed', () => this.onWindowAllClosed());

    this.mainWindow = null;
    this.gettingStartedWindow = null
  }

  onReady() {
    this.mainWindow = new BrowserWindow({ width: 800, height: 600 });
    this.mainWindow.loadUrl(this.viewPath('index.html'));
    // this.mainWindow.openDevTools();

    this.mainWindow.on('closed', function() {
      this.mainWindow = null;
    });
  }

  onWindowAllClosed() {
    if (process.platform != 'darwin') {
      app.quit();
    }
  }

  viewPath(...args) {
    var fullPath = path.resolve(__dirname, '..', '..', 'views', ...args);
    return 'file://' + fullPath;
  }
}

module.exports = Application;
