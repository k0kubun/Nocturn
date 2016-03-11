'use strict';

require('shelljs/global');
const version = require('./version').version;

exec(`cd packages/v${version} && zip -r Nocturn-darwin-x64.zip Nocturn-darwin-x64`)
exec(`cd packages/v${version} && zip -r Nocturn-linux-x64.zip Nocturn-linux-x64`)
exec(`cd packages/v${version} && zip -r Nocturn-win32-x64.zip Nocturn-win32-x64`)
exec(`cd packages/v${version} && zip -r Nocturn-linux-ia32.zip Nocturn-linux-ia32`)
exec(`cd packages/v${version} && zip -r Nocturn-win32-ia32.zip Nocturn-win32-ia32`)
