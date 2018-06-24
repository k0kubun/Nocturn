'use strict';

require('shelljs/global');
const version = require('./version').version;

[
  'Nocturn-darwin-x64',
  'Nocturn-linux-x64',
  'Nocturn-win32-x64',
  'Nocturn-linux-ia32',
  'Nocturn-win32-ia32',
].forEach((name) => {
  exec(`
    cd "packages/v${version}"
    if [ -d "${name}" ]; then
      zip -r --symlinks "${name}.zip" "${name}"
    fi
  `)
});
