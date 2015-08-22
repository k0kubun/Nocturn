var app = require('app');
var Menu = require('menu');
var BrowserWindow = require('browser-window');
var mainWindow = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({ width: 320, height: 640 });
  mainWindow.loadUrl('file://' + __dirname + '/src/timeline/index.html');
  mainWindow.on('closed', function() {
    mainWindow = null;
  });

  var template = [
    {
      label: 'Quit',
      submenu: [
        {
          label: 'Quit Nocturn',
          accelerator: 'Command+Q',
          click: function() {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Open DevTools',
          accelerator: 'Alt+Command+I',
          click: function() {
            BrowserWindow.getFocusedWindow().toggleDevTools();
          }
        }
      ]
    }
  ];
  var menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
});
