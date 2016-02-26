var app = require("app");
var BrowserWindow = require("browser-window");

app.on("ready", function() {
  var mainWindow = new BrowserWindow({
    width: 350,
    height: 640
  });

  mainWindow.loadUrl("file://" + __dirname + "/app/index.html");

  return mainWindow.on("closed", function() {
    return app.quit();
  });
});

app.on("window-all-closed", function() {});
