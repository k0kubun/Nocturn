import fs from 'fs';

export default class JsonLoader {
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

  static writeHome(name, data) {
    var path = `${this.getUserHome()}/${name}`;
    let ret = fs.writeFileSync(path, JSON.stringify(data))
    if (process.platform !== 'win32') {
      fs.chmodSync(path, '600');
    }
    return ret;
  }

  static readHome(name) {
    var path = `${this.getUserHome()}/${name}`;

    if (!fs.existsSync(path)) {
      return null;
    }
    return JSON.parse(fs.readFileSync(path, 'utf-8'));
  }

  static getUserHome() {
    return process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
  }
}
