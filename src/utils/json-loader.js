var fs = require("fs");
var path = require("path");

module.exports = class JsonLoader {
  static write(name, data) {
    var jsonPath = path.resolve(__dirname, "..", "..", "resources", name);
    return fs.writeFileSync(jsonPath, JSON.stringify(data));
  }

  static read(name) {
    var jsonPath = path.resolve(__dirname, "..", "..", "resources", name);

    if (!fs.existsSync(jsonPath)) {
      return null;
    }

    return JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
  }
};
