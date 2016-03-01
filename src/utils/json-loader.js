import fs from 'fs';

module.exports = class JsonLoader {
  static write(name, data) {
    var path = `${__dirname}/../../resources/${name}`;
    return fs.writeFileSync(path, JSON.stringify(data));
  }

  static read(name) {
    var path = `${__dirname}/../../resources/${name}`;

    if (!fs.existsSync(path)) {
      return null;
    }
    return JSON.parse(fs.readFileSync(path, 'utf-8'));
  }
}
