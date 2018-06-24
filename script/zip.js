'use strict';

require('shelljs/global');

if (process.env.TRAVIS_OS_NAME === 'linux') {
  exec(`cd packages && zip -r --symlinks Nocturn-linux-x64.zip Nocturn-linux-x64 && rm -rf Nocturn-linux-x64`)
  exec(`cd packages && zip -r --symlinks Nocturn-win32-x64.zip Nocturn-win32-x64 && rm -rf Nocturn-win32-x64`)
  exec(`cd packages && zip -r --symlinks Nocturn-linux-ia32.zip Nocturn-linux-ia32 && rm -rf Nocturn-linux-ia32`)
  exec(`cd packages && zip -r --symlinks Nocturn-win32-ia32.zip Nocturn-win32-ia32 && rm -rf Nocturn-win32-ia32`)
}
else {
  exec(`cd packages && zip -r --symlinks Nocturn-darwin-x64.zip Nocturn-darwin-x64 && rm -rf Nocturn-darwin-x64`)
}
