'use strict';

require('shelljs/global');
const packager = require('electron-packager');
const pkg = require(`${__dirname}/../package.json`);
const devDeps = Object.keys(pkg.devDependencies);

const DEFAULT_OPTS = {
  dir:   './',
  name:  'Nocturn',
  asar:  true,
  prune: true,
  out:   `packages/v${pkg.version}`,
  'app-version': pkg.version,
  ignore: [
    '.DS_Store',
    'accounts.json',
    '/packages($|/)',
    '/script($|/)',
  ].concat(devDeps.map(name => `/node_modules/${name}($|/)`)),
}

const pack = (platform, arch, callback) => {
  const iconObj = {
    icon: 'resources/Nocturn' + (() => {
      let extension = '.png';
      if (platform === 'darwin') {
        extension = '.icns';
      } else if (platform === 'win32') {
        extension = '.ico';
      }
      return extension;
    })()
  };

  const opts = Object.assign({}, DEFAULT_OPTS, iconObj, { platform, arch });
  packager(opts, (err, filepath) => {
    if (err) return console.error(err);
    console.log(`${platform}-${arch} finished!`);
  });
}

exec('rm -rf packages');
pack('darwin', 'x64');
pack('linux',  'ia32');
pack('linux',  'x64');
pack('win32',  'ia32');
pack('win32',  'x64');
